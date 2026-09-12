# Perform a read-only Cloudflare dashboard check with ego-browser

Use this guide to verify that ego-browser can access a Cloudflare account dashboard without changing account configuration.

## Before you begin

- ego-browser must be available to Codex.
- You need an authorized Cloudflare account.
- Be ready to complete sign-in, MFA, or CAPTCHA yourself if Cloudflare requests it.

## Steps

1. **Open the Cloudflare dashboard** — In a new ego-browser task space, go to `https://dash.cloudflare.com`.
   - **Expected result:** Cloudflare loads either the sign-in page or the **Accounts** selection page.

2. **Complete authentication if prompted** — Sign in using your normal Cloudflare method and complete any human verification. Return browser control to the agent only after authentication finishes.
   - **Expected result:** The URL no longer ends in `/login` and the **Accounts** page or an account dashboard appears.

3. **Select the intended account** — On **Accounts**, select the account you want to inspect.
   - **Expected result:** The URL becomes account-scoped and the page title is **Home | Cloudflare**.

4. **Confirm available dashboard navigation** — Read the sidebar and the visible resource areas without activating create, edit, delete, deploy, dismiss, or billing controls.
   - **Expected result:** The dashboard shows account navigation such as **Domains**, **Workers & Pages**, **AI**, **Storage & databases**, and **Manage account**.

5. **Finish the read-only check** — Record the dashboard URL and title, then close the task space unless the user asks to keep it open.
   - **Expected result:** The authenticated dashboard was reached and no settings were changed.

## Verify

The check succeeds when an account-scoped Cloudflare **Home** page loads after account selection, instead of the authentication page or account picker.

## Troubleshooting

- **Cloudflare displays a sign-in page** — Complete the sign-in, MFA, or CAPTCHA in the handed-off tab, then explicitly tell the agent to continue.
- **The browser is user-controlled** — Reply `continue` after the human-only step. The agent must wait for that confirmation before resuming.

## Notes

- Interface observed on 2026-09-10.
- Keep account emails, account IDs, tokens, passwords, and private dashboard screenshots out of shared tutorials.
