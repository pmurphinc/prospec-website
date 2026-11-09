# GTM configuration required — booking funnel

**Status as of 2026-11-09: container DONE, GA4 reporting config BLOCKED.**

Steps 1-3 (trigger, variables, tag parameters) are published live as container
**Version 4**. Verified end-to-end in a clean browser profile: loading
`/home-inspection-folsom` sends `/g/collect` to `G-GDY5DXZ6Z7` with
`en=view_service`, `ep.service_type=residential_home_inspection`,
`ep.city_page=home-inspection-folsom`. Before this, that event was dropped.

Steps 4-5 (custom dimensions, key events) are **blocked on access**. The GA4
property behind `G-GDY5DXZ6Z7` is not visible from `pmurphinc@gmail.com` — the
only Analytics property on that account is TidyTuft (`G-T7DRXWJY59`). Sign in
with the account that owns the property, or grant this one Administrator.
Data is collecting meanwhile; the parameters are stored and appear in reports
once registered.

Step 7 (Spectora redirect) is still outstanding, so `booking_complete` cannot
fire yet.

Historical note: a `dataLayer.push()` alone does **not** mean GA4 is collecting
anything. That was the root cause here — the code pushed 12 events while the
published trigger accepted 7, two of which were dead names.

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

## Step 4 — Register the custom dimensions in GA4  ⛔ BLOCKED (no property access)

GA4 will not show a custom parameter in reports until it is registered.
**Admin → Custom definitions → Create custom dimension**, scope **Event**:

| Dimension name   | Event parameter    |
| ---------------- | ------------------ |
| Element location | `element_location` |
| Service type     | `service_type`     |
| City page        | `city_page`        |
| Landing path     | `landing_path`     |

## Step 5 — Mark the conversions  ⛔ BLOCKED (no property access)

**Admin → Events → Mark as key event** for:

- `booking_complete`
- `generate_lead`

Do not mark `booking_cta_click`, `scheduler_view`, or `scheduler_loaded` as key
events. None of them is a booking.

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
