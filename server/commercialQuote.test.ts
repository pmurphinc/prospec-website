import assert from "node:assert/strict";
import test from "node:test";
import type { Request, Response } from "express";
import {
  commercialQuoteSchema,
  createCommercialQuoteHandler,
  sendCommercialQuoteEmail,
} from "./commercialQuote";

const validQuote = {
  name: "Taylor Example",
  phone: "555-555-1212",
  email: "taylor@example.com",
  address: "100 Main Street, Raleigh, NC",
  propertyType: "office",
  sqft: "25,000",
  buildingsCount: "2",
  yearBuilt: "1998",
  purpose: "purchase",
  desiredDate: "2026-06-30",
  message: "Please inspect the roof and HVAC systems.",
};

function createResponse() {
  const calls: { status?: number; json?: unknown } = {};
  const response = {
    status(status: number) {
      calls.status = status;
      return response;
    },
    json(body: unknown) {
      calls.json = body;
      return response;
    },
  };

  return { calls, response: response as unknown as Response };
}

test("the existing schema accepts the form payload and rejects invalid input", () => {
  assert.equal(commercialQuoteSchema.safeParse(validQuote).success, true);
  assert.equal(
    commercialQuoteSchema.safeParse({ ...validQuote, email: "not-an-email" })
      .success,
    false
  );
});

test("sendCommercialQuoteEmail sends plain-text and HTML details to Resend", async () => {
  const requests: Array<{ url: string; request?: RequestInit }> = [];
  const fetchMock: typeof fetch = async (url, request) => {
    requests.push({ url: String(url), request });
    return Response.json({ id: "email_123" }, { status: 200 });
  };
  const submittedAt = "2026-06-09T12:00:00.000Z";

  const result = await sendCommercialQuoteEmail(
    validQuote,
    submittedAt,
    {
      RESEND_API_KEY: "re_test_key",
      COMMERCIAL_LEAD_TO: "leads@weareprospec.com",
      COMMERCIAL_LEAD_FROM: "ProSpec Leads <quotes@weareprospec.com>",
    },
    fetchMock
  );

  assert.deepEqual(result, { id: "email_123" });
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, "https://api.resend.com/emails");
  assert.deepEqual(requests[0].request?.headers, {
    Authorization: "Bearer re_test_key",
    "Content-Type": "application/json",
  });

  const body = JSON.parse(String(requests[0].request?.body));
  assert.equal(body.from, "ProSpec Leads <quotes@weareprospec.com>");
  assert.equal(body.to, "leads@weareprospec.com");
  assert.equal(body.reply_to, validQuote.email);
  assert.equal(body.subject, "New ProSpec Commercial Inspection Lead");
  assert.match(body.text, new RegExp(`Name: ${validQuote.name}`));
  assert.match(body.text, new RegExp(`Submitted timestamp: ${submittedAt}`));
  assert.match(body.text, /Source: ProSpec website commercial quote form/);
  assert.match(body.html, /Please inspect the roof and HVAC systems\./);
});

test("missing Resend configuration fails before an API request", async () => {
  let requestMade = false;
  const fetchMock: typeof fetch = async () => {
    requestMade = true;
    return Response.json({ id: "unexpected" });
  };

  await assert.rejects(
    sendCommercialQuoteEmail(
      validQuote,
      new Date().toISOString(),
      {},
      fetchMock
    ),
    /Missing required server environment variable: RESEND_API_KEY/
  );
  assert.equal(requestMade, false);
});

test("valid requests return the existing 202 response after delivery", async t => {
  t.mock.method(console, "info", () => undefined);
  let sendCount = 0;
  const { calls, response } = createResponse();
  const handler = createCommercialQuoteHandler(async () => {
    sendCount += 1;
    return { id: "email_123" };
  });

  await handler({ body: validQuote } as Request, response, () => undefined);

  assert.equal(sendCount, 1);
  assert.equal(calls.status, 202);
  assert.deepEqual(calls.json, {
    message:
      "Your quote request was received by the website system. ProSpec will confirm availability after review.",
  });
});

test("invalid requests return 400 without sending email", async () => {
  let sendCount = 0;
  const { calls, response } = createResponse();
  const handler = createCommercialQuoteHandler(async () => {
    sendCount += 1;
    return { id: "email_123" };
  });

  await handler(
    { body: { ...validQuote, phone: "short" } } as Request,
    response,
    () => undefined
  );

  assert.equal(sendCount, 0);
  assert.equal(calls.status, 400);
});

test("delivery failures are logged and return the safe 500 response", async t => {
  let loggedError: unknown;
  t.mock.method(console, "error", (...args: unknown[]) => {
    loggedError = args;
  });
  const { calls, response } = createResponse();
  const handler = createCommercialQuoteHandler(async () => {
    throw new Error("Resend unavailable");
  });

  await handler({ body: validQuote } as Request, response, () => undefined);

  assert.ok(loggedError);
  assert.equal(calls.status, 500);
  assert.deepEqual(calls.json, {
    message:
      "Your request could not be sent. Please call or text ProSpec directly.",
  });
});
