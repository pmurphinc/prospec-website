# GTM configuration required — booking funnel

**Status as of 2026-11-09: container DONE, GA4 reporting config DONE.**
**Only Step 7 (Spectora redirect) remains.**

Steps 1-3 (trigger, variables, tag parameters) went live as container
**Version 4**. Steps 4-5 (custom dimensions, key events) are now done too.

### The property was never lost

An earlier revision of this file said `G-GDY5DXZ6Z7` was orphaned and
unrecoverable. That was wrong. The property lives in Analytics account
**399639517**, property **543694566**, stream **15177477741**
("ProSpec Inspections", `https://www.weareprospec.com/`). It simply was not
shared with `pmurphinc@gmail.com`. Granting that account Administrator made it
visible immediately, with its full history intact.

The lesson: three Google accounts are signed into Patrick's Chrome profile.
Checking only `authuser=0` and concluding "no access" is how this went wrong —
enumerate `authuser=0,1,2` before declaring anything unreachable.

### Container versions published today

| Version | Change |
|---|---|
| 4 | Trigger regex covers all 12 events; 3 DLVs added; 5 tag parameters |
| 5 | Repointed both tags to `G-3B6C3G1HM4` — **mistake**, see below |
| 6 | Reverted both tags to `G-GDY5DXZ6Z7`. **This is live.** |

Version 5 was made while the original property still looked unreachable. Three
strays were created during that detour. Cleanup status as of 2026-11-09:

| Stray | Where | Status |
|---|---|---|
| GA4 `G-KCEPR56RS9` | account 415623097, stream URL missing `www` | **Moved to trash** (recoverable 35 days) |
| GA4 `G-3B6C3G1HM4` | account not shared with `pmurphinc@gmail.com` | Outstanding — needs the work account |
| GTM `GTM-M7MJJHGG` | GTM account not shared with `pmurphinc@gmail.com` | Outstanding — needs the work account |

`GTM-M7MJJHGG` must **never** be added to the site — it loads `GTM-PSZRF8VS`,
and a second container would double-count every pageview. Verified 2026-11-09
that the live homepage loads `GTM-PSZRF8VS` only, and that no stray ID appears
anywhere in the repo outside this file.

Account **415623097** ("ProSpec Home Inspections") now holds no properties. It
is a duplicate of the real account name and is worth deleting to avoid future
confusion, but an empty account is harmless.

Note for future repoints: changing the measurement ID in the GA4 Event tag makes
GTM silently add a duplicate destination tag plus two settings, one of which is
*Allow user-provided data capabilities* (permits collecting hashed email/phone).
Check the pending-changes list and abandon anything you did not make before
publishing.

### Verified end-to-end (clean browser profile, after Version 6)

```
/home-inspection-folsom  → en=view_service  tid=G-GDY5DXZ6Z7
                           ep.city_page=home-inspection-folsom
                           ep.service_type=residential_home_inspection
/commercial-property-condition-assessments-sacramento
                         → en=view_service  ep.service_type=commercial_pca
```

Step 7 (Spectora redirect) is still outstanding, so `booking_complete` cannot
fire yet.

Historical note: a `dataLayer.push()` alone does **not** mean GA4 is collecting
anything. That was the root cause here — the code pushed 12 events while the
published trigger accepted 7.

Those 7 included `commercial_quote_submit` and `scheduler_page_view`, which an
earlier revision called "dead names". They were not dead: production was still
serving the Aug 12 build, which pushed exactly those names. Today's deploy
renamed them, which is what broke the match.

- GTM container: `GTM-PSZRF8VS`
- GA4 measurement ID: `G-GDY5DXZ6Z7`

## What the published container does today

Read from the live container script on the date of this audit
(`https://www.googletagmanager.com/gtm.js?id=GTM-PSZRF8VS`).

**Tags (2)**

| Tag        | Type        | Fires on                       | Notes                                                            |
| ---------- | ----------- | ------------------------------ | ---------------------------------------------------------------- |
| Google tag | `__googtag` | Initialization (`gtm.init`)    | Loads `G-GDY5DXZ6Z7`                                             |
| GA4 Event  | `__gaawe`   | the Custom Event trigger below | Event Name = `{{Event}}`, Measurement ID override `G-GDY5DXZ6Z7` |

**Event parameters currently sent by the GA4 Event tag**

| Parameter          | Source                                             |
| ------------------ | -------------------------------------------------- |
| `element_location` | Data Layer Variable `element_location` (version 2) |
| `page_path`        | Built-in URL variable, component **Path**          |

**Trigger (1)** — Custom Event, matches this regex:

```
^(phone_click|email_click|booking_cta_click|commercial_quote_cta_click|commercial_quote_submit|commercial_quote_error|scheduler_page_view)$
```

### What this means

- Events **not** in that regex are pushed to the dataLayer and then dropped.
  They never reach GA4.
- `scheduler_page_view` and `commercial_quote_submit` no longer exist in the
  code. They were renamed to `scheduler_view` and `generate_lead`. **Those two
  trigger entries are now dead** and must be updated or GA4 loses them.
- The tag reads `element_location`. The code deliberately still uses that exact
  dataLayer key. **Do not rename it in code without changing the variable
  here**, or the parameter silently arrives empty.
- `page_path` comes from GTM's own URL variable, not from the dataLayer, so it
  keeps working regardless.

## Step 1 — Replace the Custom Event trigger  ✅ DONE (Version 4)

Edit the existing Custom Event trigger (or create one and repoint the GA4 Event
tag at it). Use **Event name matches RegEx**:

```
^(view_service|booking_cta_click|scheduler_view|scheduler_loaded|quote_view|phone_click|text_click|email_click|generate_lead|booking_complete|commercial_quote_cta_click|commercial_quote_error)$
```

This keeps every event that already worked and adds the new ones. Nothing that
currently reports is dropped.

## Step 2 — Add three Data Layer Variables  ✅ DONE (Version 4)

Type: **Data Layer Variable**, Version **2**, no default value.

| Variable name        | Data Layer Variable Name |
| -------------------- | ------------------------ |
| `DLV - service_type` | `service_type`           |
| `DLV - city_page`    | `city_page`              |
| `DLV - landing_path` | `landing_path`           |

`element_location` already exists — leave it exactly as it is.

## Step 3 — Extend the GA4 Event tag parameters  ✅ DONE (Version 4)

Open the GA4 Event tag and add to **Event Parameters** (keep the two existing
rows):

| Parameter name     | Value                                               |
| ------------------ | --------------------------------------------------- |
| `element_location` | `{{element_location}}` _(existing — do not change)_ |
| `page_path`        | `{{Page Path}}` _(existing — do not change)_        |
| `service_type`     | `{{DLV - service_type}}`                            |
| `city_page`        | `{{DLV - city_page}}`                               |
| `landing_path`     | `{{DLV - landing_path}}`                            |

Leave Event Name as `{{Event}}`.

## Step 4 — Register the custom dimensions in GA4  ✅ DONE

GA4 will not show a custom parameter in reports until it is registered.
**Admin → Custom definitions → Create custom dimension**, scope **Event**.

Registered 2026-11-09 in property **543694566** (account 399639517). Dimension
names were set identical to the parameter names so reports and the dataLayer
read the same — no mental translation:

| Dimension name     | Scope | Event parameter    |
| ------------------ | ----- | ------------------ |
| `element_location` | Event | `element_location` |
| `service_type`     | Event | `service_type`     |
| `city_page`        | Event | `city_page`        |
| `landing_path`     | Event | `landing_path`     |

GA4 does not backfill: these populate from the moment they were registered, not
retroactively.

## Step 5 — Mark the conversions  ✅ DONE

**Admin → Events → Mark as key event** for:

- `booking_complete`
- `generate_lead`

Do not mark `booking_cta_click`, `scheduler_view`, or `scheduler_loaded` as key
events. None of them is a booking.

Done 2026-11-09. Two things found while doing it:

- **`booking_cta_click` was marked as a key event** and has been since the
  property was set up, so every CTA click counted as a conversion. Unmarked.
  Any "conversion" figure in this property before 2026-11-09 is CTA clicks, not
  bookings, and should not be compared against the numbers from now on.
- Neither target event had ever fired, so neither appeared in the events list.
  They were registered via **Create event → Create with code** with *Mark as key
  event* on. That dialog defaults to **assigning $1 of revenue per occurrence** —
  set "Don't set a default key event value" instead, or GA4 reports invented
  revenue.

`purchase` remains listed as a GA4 built-in key event. It never fires on this
site; harmless.

## Step 6 — Verify in GA4 DebugView

Use GTM Preview and confirm each event fires **exactly once** and carries its
parameters:

| Route / action                             | Expect                           | Parameters                                                                     |
| ------------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------ |
| Load `/services`                           | `view_service` ×1                | `service_type=all_services`                                                    |
| Load `/home-inspection-folsom`             | `view_service` ×1                | `service_type=residential_home_inspection`, `city_page=home-inspection-folsom` |
| Click any Book Now CTA                     | `booking_cta_click` ×1           | `element_location`                                                             |
| Load `/booknow`                            | `scheduler_view` ×1              | `page_path=/booknow`                                                           |
| Scheduler iframe finishes                  | `scheduler_loaded` ×1            | —                                                                              |
| Scroll the commercial quote form into view | `quote_view` ×1                  | `service_type=commercial_quote`                                                |
| Click a phone link                         | `phone_click`                    | `element_location`                                                             |
| Click a text link                          | `text_click`                     | `element_location`                                                             |
| Submit the commercial quote successfully   | `generate_lead` ×1               | `service_type=commercial_quote`                                                |
| Land on `/booking-confirmed`               | `booking_complete` ×1            | —                                                                              |
| Refresh `/booking-confirmed`               | **no second** `booking_complete` | —                                                                              |

Also confirm **no** event carries a name, email address, phone number, or
inspection address. The code enforces a parameter allowlist, but verify.

## Step 7 — Spectora redirect (required for booking_complete)

In Spectora, set the post-booking redirect to:

```
https://www.weareprospec.com/booking-confirmed
```

Then complete one real test booking and confirm `booking_complete` appears in
DebugView.

**Until this is done, `booking_complete` will never fire. That is "pending",
not "zero bookings".**

### What this event does and does not mean

`booking_complete` is a **redirect-based proxy**, not a confirmation from
Spectora. ProSpec receives no direct completion signal: the scheduler is a
cross-origin iframe with no documented postMessage API or callback.

- Someone who navigates to `/booking-confirmed` directly, or shares the URL,
  will be counted.
- Someone who books but never lands on the redirect will not be counted.

Spectora remains the system of record for actual bookings.

## What cannot be measured at all

Everything inside the Spectora iframe is invisible to this site: date
selection, add-on selection, the price shown in the scheduler, form validation,
and the submission itself. `scheduler_loaded` means only that the iframe
finished loading — it is **not** an availability check.

The stronger alternative, if you ever want authoritative numbers, is a
server-side integration: a Spectora webhook posting to an endpoint that sends
the conversion to GA4 via the Measurement Protocol. That requires Spectora
webhook/API access this audit could not verify.
