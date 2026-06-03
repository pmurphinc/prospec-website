import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commercialQuoteSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(10).max(40),
  email: z.string().trim().email().max(160),
  address: z.string().trim().min(5).max(240),
  propertyType: z.string().trim().min(1).max(80),
  sqft: z.string().trim().min(1).max(40),
  buildingsCount: z.string().trim().min(1).max(40),
  yearBuilt: z.string().trim().max(20).optional().default(""),
  purpose: z.string().trim().min(1).max(120),
  desiredDate: z.string().trim().min(1).max(40),
  message: z.string().trim().max(2000).optional().default(""),
});

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "25kb" }));

  app.post("/api/commercial-quote", (req, res) => {
    const parsed = commercialQuoteSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Please complete the required quote fields before submitting.",
      });
      return;
    }

    // TODO: Integrate a production email/CRM provider such as Resend, SendGrid,
    // Mailgun, or SMTP so ProSpec receives an immediate lead notification.
    // Until that integration is configured, Railway logs retain the received lead
    // for operational review without telling visitors that an email was sent.
    console.info("Commercial quote request received", {
      receivedAt: new Date().toISOString(),
      ...parsed.data,
    });

    res.status(202).json({
      message:
        "Your quote request was received by the website system. ProSpec will confirm availability after review.",
    });
  });

  app.use("/api", (_req, res) => {
    res.status(404).json({ message: "API route not found." });
  });

  // Serve static files from dist/public in production.
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing for Wouter. Unknown non-API routes fall back to index.html.
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.info(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(error => {
  console.error("Failed to start server", error);
  process.exit(1);
});
