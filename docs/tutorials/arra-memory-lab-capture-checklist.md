# Arra Memory Lab screenshot capture checklist

Companion to the [45-step walkthrough](arra-memory-lab-cloudflare-claude.md).

**Current inventory: 5 real images.** The other rows below are capture targets, not files or completed actions. Capture each meaningful screen transition, completed configuration state, validation result, and error/recovery state—not every keystroke. If the live interface differs, update the target instead of fabricating a matching screen.

## Existing images

| ID | Walkthrough step | What the image proves | File |
| --- | --- | --- | --- |
| E01 | 01, 05 | Official README and deploy button, revisited | [01-github-deploy-button.png](images/arra-memory-lab/01-github-deploy-button.png) |
| E02 | 08 | Cloudflare requests a GitHub connection refresh | [02-cloudflare-setup.png](images/arra-memory-lab/02-cloudflare-setup.png) |
| E03 | 04 | An existing Worker was found before any new deployment | [03-existing-worker.png](images/arra-memory-lab/03-existing-worker.png) |
| E04 | 28 | Existing lab's unauthenticated interface only | [04-lab-locked.png](images/arra-memory-lab/04-lab-locked.png) |
| E05 | 34 | Claude.ai's unsubmitted custom-connector form | [05-claude-custom-connector.png](images/arra-memory-lab/05-claude-custom-connector.png) |

E04 must not be relabeled as the new installation. The explanatory permission image inside E02 must not be relabeled as a completed GitHub grant.

## Missing intermediate and completion captures

These are 29 additional target states, for up to 34 meaningful figures including the existing five. The final number depends on the real UI; some adjacent states may share a readable screenshot. Login, secret typing, and sensitive consent parameters remain excluded even when every step is documented.

| Done | ID | Steps | Capture target | Include | Exclude / verification rule |
| --- | --- | --- | --- | --- | --- |
| [ ] | P01 | 03 | Cloudflare account picker | Picker context and intended-account selection | Hide emails and account IDs |
| [ ] | P02 | 06 | Initial deployment form | Template context and form heading | Do not imply resources already exist |
| [ ] | P03 | 07 | Git account selection | The intended selected connection | Hide unrelated organization/account options |
| [ ] | P04 | 10 | Returned/refreshed connection | Form with the refresh requirement resolved | No credential or GitHub permission tokens |
| [ ] | P05 | 11–12 | Unique project and visibility | New project name, repository privacy choice | Show validation errors if present |
| [ ] | P06 | 13–14 | New OAuth KV selection | **+ Create new**, unique namespace name | Do not publish raw resource IDs |
| [ ] | P07 | 15–16 | Fresh D1 selection | New-database choice and new name | Clearly distinguish from existing selection |
| [ ] | P08 | 17 | Secret field boundary | `LAB_ACCESS_TOKEN` label and an opaque mask | Never show the value, length-sensitive contents, or clipboard |
| [ ] | P09 | 18–20 | Build/deploy settings | `0.7`, build command, safe replacement deploy command | Capture full commands legibly |
| [ ] | P10 | 21 | Final pre-deploy review | Unique project, new storage choices, commands | Mask account identity and secret values |
| [ ] | P11 | 22 | Deployment started | New project name and a real pending/running state | Not a success screenshot |
| [ ] | P12 | 23 | Build result | Relevant build success or failure excerpt | Redact credentials, unrelated logs, and IDs |
| [ ] | P13 | 24 | Migration result | Fresh target identity by safe name and result | Stop if old storage is targeted |
| [ ] | P14 | 25 | Published Worker | Actual fresh URL and successful deployment state | A predicted URL does not count |
| [ ] | P15 | 26 | Deployed bindings | `DB`, `OAUTH_KV`, `AI` and fresh resource names | Hide IDs and secret values; inspect real bindings |
| [ ] | P16 | 27 | Original installation comparison | Original deployment remains separate | No corpus contents or private identifiers |
| [ ] | P17 | 28 | Fresh public app | Real fresh app before corpus access | Not the old preflight app screenshot |
| [ ] | P18 | 29 | Fresh `/api/info` | Status, name, version, endpoint | Public metadata only; pair with saved proof |
| [ ] | P19 | 31 | Claude account menu | **Settings** entry | Hide profile and unrelated conversations |
| [ ] | P20 | 32 | Claude Connectors panel | Sidebar context and **Add** control | Hide unrelated connector details if unnecessary |
| [ ] | P21 | 33 | Duplicate check | Relevant fresh-name search result | Do not imply a name search proves endpoint absence |
| [ ] | P22 | 35–36 | Completed connector form | Fresh name and verified `/mcp` URL | No owner secret in any field or URL |
| [ ] | P23 | 37 | Actual second setup screen | Its real labels and next action | Do not reuse the empty first-step form |
| [ ] | P24 | 38 | OAuth review screen | Verified fresh domain context, client, scope labels | Hide codes, state/query tokens, and passphrase |
| [ ] | P25 | 40 | Connected state | Fresh connector and actual connection status | No OAuth tokens |
| [ ] | P26 | 41 | Connector enabled in a new chat | Fresh connector selected | No unrelated chat history |
| [ ] | P27 | 42–43 | Real `lab_info` tool activity | Tool name, successful metadata response | A prose-only answer is insufficient |
| [ ] | P28 | 44 | Authenticated fresh database stats | `memory_stats` tool and returned counts | Metadata only; no memory contents |
| [ ] | P29 | 45 | Final verification summary | Evidence-backed success criteria | Create only when all checks actually pass |

## Capture record for each new image

Record these alongside the relevant walkthrough step or evidence entry:

- Step number and actual action taken.
- Observation time and screen name.
- Safe public URL, or a redacted dashboard path that cannot expose account IDs/tokens.
- Expected result and actual result, including failures.
- Image path and what was hidden before capture.
- Whether this is an original action, a revisit, or a later verification.

Preserve unsuccessful attempts as clearly labeled troubleshooting evidence when they help readers. Do not rerun a deployment, migration, or OAuth grant solely to obtain a nicer screenshot.

## Image acceptance checks

Before embedding a capture:

1. Open the actual saved image. It must not be blank, stale, or cropped through the control being explained.
2. The text must be readable at a normal GitHub page width; use separate captures for long forms instead of shrinking everything into one image.
3. Remove sensitive areas at capture time. Check account menus, sidebars, address/query parameters, password fields, logs, and OAuth redirects.
4. Write descriptive alt text and a caption that says what the image proves, not what was hoped for.
5. Use a relative path under `images/arra-memory-lab/`. Embed only existing files; planned filenames are not image links.
6. Verify that the image and Markdown will be included together when the owner chooses to publish.

**While the browser is handed to the owner:** do not recapture or take control back without explicit confirmation. The checklist documents remaining work; it is not permission to proceed through authentication.
