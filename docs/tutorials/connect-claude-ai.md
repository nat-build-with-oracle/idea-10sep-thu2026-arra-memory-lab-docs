# Connecting a memory server to claude.ai

[← Memory on claude.ai](./) · [arra-memory-lab](one-click-install/) · [digger-node](digger-node/) · [thor-memory](thor-memory/)

The connector flow, once, with screenshots. Every memory server in this fleet uses
it — `arra-memory-lab`, `thor-memory`, `arra-memory`, `memory-lab-2sep`,
`digger-node`. The per-app pages link here rather than repeating it.

Captured 2026-09-10 against a real connection.

---

## Before you start

Your server must answer these. If it does not, fix that first — the connector will
fail in ways the dialog does not explain.

```bash
U=https://your-server.example.com

curl -s -o /dev/null -w 'root      %{http_code}\n' "$U/"
curl -s -o /dev/null -w 'mcp       %{http_code}\n' -X POST -H 'content-type: application/json' \
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' "$U/mcp"
curl -s "$U/.well-known/oauth-authorization-server" | jq -e .registration_endpoint
```

| | Expected |
|---|---|
| `/` | `200` |
| `POST /mcp` without a token | **`401`** — this is correct, it means auth is enforced |
| `.well-known/oauth-authorization-server` | `200` **and valid JSON with `registration_endpoint`** |

> [!CAUTION]
> **`jq -e`, not the status code.** A server can return `200` on that path and serve
> its **SPA's HTML**, because a catch-all route answers every unmatched path. A
> status-only check reports OAuth support that is not there. `jq -e` exits non-zero
> on HTML, which is the whole point of using it.

---

## Step 1 — Open Connectors

> [!NOTE]
> **It moved.** `claude.ai/settings/connectors` now only says *"Connectors have moved
> to Customize."* The live route is **Customize → Connectors**
> (`claude.ai/new#settings/customize-connectors`).

Custom connectors appear with type `Web` and a `Custom` badge:

![The Connectors panel under Customize](images-claude/12-claude-connectors.png)

## Step 2 — Add a custom connector

**Add** (top right) → **Add custom connector**:

![The Add menu](images-claude/13-add-menu.png)

![The Add custom connector dialog](images-claude/14-add-custom-dialog.png)

Two fields: a display name, and the MCP endpoint.

![The dialog filled in](images-claude/15-add-custom-filled.png)

> [!TIP]
> The URL must be the **`/mcp`** path, not the server root. The dialog's own hint says
> *"The HTTPS address where the server accepts MCP requests, for example
> `https://mcp.example.com/mcp`."*

## Step 3 — claude.ai configures itself

Press **Continue**. This is where the `.well-known` documents pay off:

![Authentication and OAuth client, both auto-detected](images-claude/16-connector-added.png)

Both settings arrive pre-selected, each with a **`Detected`** badge:

| Setting | Chosen | Read from |
|---|---|---|
| **Authentication: Always required** | `Detected` | the protected-resource document |
| **OAuth client: No client ID — register one automatically** | `Detected` | the AS metadata's `registration_endpoint` |

That second one is **Dynamic Client Registration** — *"Claude registers OAuth clients
with the server as users connect."* **No client id or secret is ever pasted.** A
server without DCR would force you to "Use your own OAuth client" and register by
hand.

The third option, **Authentication: None**, is for servers with open access *or* ones
that take an API key — those use **Additional request headers** instead, where
claude.ai stores up to four values *"securely and never shown again."* No memory
server in this fleet needs that path, and `arra-memory-haos` says why in its own
config comment:

> *"claude.ai connectors CANNOT send a static header and must use the OAuth flow
> instead — that is why both exist."*

That is the reason these servers carry two secrets: a **static token** for CLI clients
that read a config file, and an **owner passphrase** for the OAuth consent page.

Press **Add**.

## Step 4 — Authorize

The connector exists but is not yet authorized:

![The connector added, showing Connect](images-claude/17-connector-listed.png)

Press **Connect**. **Your own server** serves the consent page — the `client_id` in
its URL was minted by DCR seconds earlier:

![The server's OAuth consent page](images-claude/18-oauth-consent.png)

Enter the **owner passphrase** and press **Authorize MCP client**. The page states
the model plainly:

> *"The browser passphrase is exchanged locally with this Worker; the MCP client
> receives a revocable OAuth token, not the passphrase."*

So the passphrase never leaves your browser, and what claude.ai stores is a token you
can revoke on its own.

| Server | Passphrase is |
|---|---|
| `arra-memory-lab` and its one-click copies | `LAB_ACCESS_TOKEN` |
| `thor-memory` / `arra-memory` | the add-on's **`owner_passphrase`** option — *not* `api_token` |
| `digger-node` | `OWNER_PASSPHRASE` |

## Step 5 — Connected

The button reads **Disconnect**, and claude.ai has enumerated the tools and grouped
them by risk:

![Connected, with tool permissions by group](images-claude/19-connected.png)

For `arra-memory-lab`'s nine:

| Group | Tools |
|---|---|
| Read-only (2) | `Trace get`, `Trace list` |
| Write/delete (2) | `Forget`, `Rebuild index` |
| Other (5) | `Lab info`, `Memory stats`, `Observe`, `Recall`, `Remember` |

Every group defaults to **Needs approval**, and each tool can be set individually to
always-allow, ask, or never. Leave write/delete on approval unless you have a reason.

---

## The CLIs

Same OAuth flow, **different flags** — this catches people out:

```bash
# Claude Code — uses --transport
claude mcp add --transport http <name> https://your-server/mcp
claude mcp login <name>

# Codex — uses --url, NOT --transport
codex mcp add <name> --url https://your-server/mcp
codex mcp login <name>
```

Between `add` and `login` both report the server registered and unauthorized, which
is what you should see:

```
claude:  <name>: https://…/mcp (HTTP) - ! Needs authentication
codex:   <name>  https://…/mcp   enabled   Not logged in
```

> [!WARNING]
> `codex mcp login` **opens your real default browser** and blocks on a
> `http://127.0.0.1:<port>/callback/…` redirect. Take too long and it gives up with
> `Caused by: deadline has elapsed`. Have the passphrase on your clipboard first.

---

## If the token keeps expiring

Check whether your server offers `refresh_token`:

```bash
curl -s "$U/.well-known/oauth-authorization-server" | jq .grant_types_supported
```

```json
["authorization_code", "refresh_token"]   ← claude.ai refreshes silently
["authorization_code"]                    ← full authorize flow again on every expiry
```

In this fleet only the `arra-memory-lab` lineage has the second grant. `thor-memory`,
`arra-memory`, `memory-lab-2sep` and `digger-node` do not — see the
[comparison table](./#the-three-differences).
