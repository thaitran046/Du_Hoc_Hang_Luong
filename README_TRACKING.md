# Tracking setup
1. Copy `.env.example` to `.env.local`.
2. Fill in the real IDs. If GA4 is managed inside GTM, leave `VITE_GA4_ID` empty to avoid duplicate tracking.
3. Optional: set `VITE_LEAD_ENDPOINT` to a POST endpoint that accepts JSON lead data.
4. Run `npm run dev`, then verify `window.dataLayer` in DevTools and use GTM Preview / Meta Pixel Helper / TikTok Pixel Helper as appropriate.

Tracked events include: `page_view`, `form_step_1`, `submit_form`, `generate_lead`, `form_error`, `click_cta`, `click_phone`, `thank_you_view`.
Attribution captured in sessionStorage: UTM parameters, gclid, fbclid, ttclid, msclkid, landing page and referrer.
