---
title: lanceglass
---

[English version](../../../tutorials/lanceglass/) · [← memory บน claude.ai](../) · [arra-memory-lab](../one-click-install/) · [digger-node](../digger-node/) · [thor-memory](../thor-memory/)

# lanceglass — demo ที่เปิดดูได้ กับ database ที่ต้องรันเอง

tutorial อื่นในนี้จบด้วยปุ่ม **Deploy to Cloudflare** แล้วก็ server ที่คุยด้วยได้
ตัวนี้ไม่ใช่ แล้วเหตุผลคือสิ่งที่มีประโยชน์ที่สุดในหน้านี้

**Live demo:** <https://lanceglass-fixture-demo.laris.workers.dev/>
**Source:** <https://github.com/Soul-Brews-Studio/lanceglass> — public, MIT

```
จับ 2026-09-11 กับ deployment ที่ live อยู่ · build v26.9.1-alpha.1401
```

---

## มันคืออะไร

`lanceglass` เอา session log ของ agent แบบ append-only — `.jsonl` ของ Claude Code
กับ Codex — มาแปลงเป็น **LanceDB** ที่ typed ตรวจสอบได้ มัน detect ไฟล์ใหม่กับที่
เปลี่ยน import แบบ idempotent เก็บ provenance สร้าง work history กลับมาได้ แล้วก็
build embedding space ทีหลังได้ถ้าต้องการ

มันรันบนเครื่องคุณเอง ภายใต้ Bun link ข้างบนเป็น **demo ของ interface** ไม่ใช่
instance ของ tool

---

## Step 1 — เปิด demo

![The Events workspace: a 50-row slice of the event stream, with the import panel, live-intake counters and stored-row ledger down the left](../../../tutorials/lanceglass/images/01-events-stream.png)

สาม workspace ด้านบน — **Events**, **History**, **Jobs** — สอง theme ด้านซ้าย:
import source, live-intake counter, ledger ที่อ่านว่า `events 1,000 · provenance
1,000 · source files 36`

อ่านบนขวาก่อนอะไรทั้งหมด:

```
Static fixture demo
bundled data · no KV · no D1 · no persistence
```

แล้วอ่าน text ของแถวหนึ่งจนจบ:

```
How do we import JSONL and know whether it is new?  ·  synthetic event 0945
```

**ทุกแถวติดป้าย synthetic แล้ว app บอกตรง ๆ ว่าไม่มี database** ซื่อตรงเกินกว่า
demo ทั่วไป แล้วก็ควรเชื่อจริงจัง — ดู [Step 5](#step-5--สิ่งที่คุณกำลังดูอยู่จริง-ๆ)

---

## Step 2 — History: session ไม่ใช่แถว

![Work history for a week: 43 sessions grouped by Bangkok day, with per-session event counts, evidence previews and a Vector map action](../../../tutorials/lanceglass/images/02-history-week.png)

`Day / Week / Month` เหนือ `Asia/Bangkok` จัดกลุ่มตามวัน แล้วก็ project แล้วก็
source กับ directory แต่ละแถวคือ session พร้อม event count แล้วก็ preview ของ
block แรก

บรรทัดหนึ่งใต้ total คือส่วนที่ควรขโมยไปใช้:

> *Canonical totals are unique. Directory counts are overlapping provenance views
> and must not be added together.*

UI ที่บอกว่าตัวเลขของตัวเองอันไหนบวกกันได้

---

## Step 3 — Jobs: import log พูดตรง ๆ

![The Jobs workspace showing a completed 1.4s static fixture import, with its full log](../../../tutorials/lanceglass/images/03-jobs.png)

```
[demo] Static mode: no filesystem, KV, D1, or LanceDB writes.
[jscan] scan complete   36/36  /demo/fixtures/jsonl
[jscan] plan complete   36/36
[jscan] import progress 3/3  records=180  blocks=244
[demo] Simulation complete. Refreshing restores the same fixtures.
```

`0 inserted · 244 duplicates · 0 corrupt` — demo เล่นซ้ำรูปร่างของการ re-import
แบบ idempotent ที่ทุกอย่างรู้อยู่แล้ว บน corpus จริงนั่นคือผลลัพธ์ปกติของการรัน
import สองครั้ง

---

## Step 4 — สอง visualisation

**Facets** ใน Events → Visualize:

![Activity pulse histogram plus facet bars for block type, semantic role, project and directory](../../../tutorials/lanceglass/images/04-visualize.png)

**session vector map** จาก `Vector map` ของแถว History ไหนก็ได้:

![The 3D session vector map: a Dual 4090 384-dimension cosine space, human/agent evidence toggles, Atlas 3D vs Flat 2D visualizers, and the session's blocks listed beneath](../../../tutorials/lanceglass/images/05-vector-3d.png)

ควรสังเกตใน panel นั้น:

| | |
|---|---|
| `demo-embedding-384 · 384d · cosine` | space มีชื่อกับมิติบอกไว้บนจอ |
| `Dual 4090 (local)` / `Cloudflare (managed)` | provider เป็นตัวเลือก index แยกกัน |
| *"spaces never blur"* | provider เดียวต่อ space — ไม่ผสมมิติกัน |
| `Atlas 3D` / `Flat 2D` | visualiser เป็น plugin ไม่ใช่ view ที่ hardcode |
| `EMBEDDED 3 · MAPPED 3 · ELIGIBLE 3 · MISSING 0` | coverage รายงานจริง ไม่ใช่สมมติ |

> **คาดว่าจะเห็นสามจุด** demo session มีแค่ 3-5 event map เลยเกือบว่าง ประเด็นที่
> มันสื่อคือเชิงโครงสร้าง — space, provider, coverage ล้วนติดป้ายไว้ — ไม่ใช่
> เชิงภาพ

แล้วก็ theme **Paper** ถ้าชอบหมึกบนกระดาษครีม:

![The same Events workspace in the Paper theme](../../../tutorials/lanceglass/images/06-paper-theme.png)

---

## Step 5 — สิ่งที่คุณกำลังดูอยู่จริง ๆ

demo เป็น Cloudflare Worker ข้อมูลมาจากตรงนี้ ใน `worker/index.ts`:

```ts
const events: DemoEvent[] = Array.from({ length: 1000 }, (_, index) => {
  const source  = SOURCES[index % SOURCES.length]!;
  const project = PROJECTS[Math.floor(index / 11) % PROJECTS.length]!;
  …
});
```

พันแถวจาก modular arithmetic เหนือชื่อ project สี่ชื่อที่ hardcode ไม่เปิด
database ด้วยซ้ำ แล้วก็ไม่อ่านไฟล์ใน `fixtures/minimal/` ของ repo เลย — "bundled"
คือคำเดียวบน badge ที่พูดเกินจริง

**นี่ไม่ใช่ทางลัด มันคือ constraint** `@lancedb/lancedb` เป็น native Rust/N-API
binding **workerd โหลด native module ไม่ได้** เพราะงั้นความพยายามแค่ไหนก็เอา
LanceDB ไปวางหลัง URL นั้นไม่ได้ Cloudflare deploy ของ lanceglass เป็นได้แค่การ
เล่นซ้ำ interface ของมันเท่านั้น

นี่คือเหตุผลที่ tool อื่นในชุดนี้หน้าตาต่างออกไป:

| Tool | Storage | รันบน Cloudflare ได้ไหม |
|---|---|---|
| [`arra-memory-lab`](../one-click-install/) | D1 | ได้ — one-click |
| [`digger-node`](../digger-node/) | D1 + FTS5 | ได้ — one-click |
| [`thor-memory`](../thor-memory/) | LanceDB บน host | ไม่ได้ — add-on รันมันเอง |
| **`lanceglass`** | **LanceDB, local** | **แค่ interface** |

fleet เดียวกัน สัปดาห์เดียวกัน constraint ตรงข้ามกัน อยากได้ memory server หลัง
URL เริ่มจากสองตัวแรก อยากเห็นหน้าตา session database แบบ typed, เก็บ
provenance, embed-ทีหลัง อันนี้แหละคือตัวที่ควรอ่าน

---

## Step 6 — รันของจริง

demo ไม่มีปุ่ม install เพราะ tool เป็น local-first ต้องการ **Bun 1.3+**

```bash
git clone https://github.com/Soul-Brews-Studio/lanceglass
cd lanceglass
bun install --frozen-lockfile

# พิสูจน์ทั้ง path ก่อนแตะ history ของตัวเอง —
# repo มี fixture ไว้สำหรับตรงนี้เป๊ะ
bun run smoke                     # 9 stage, 163 test

# dry run: ถ้ารันจะ import อะไรบ้าง ไม่เขียนอะไรจริง
bun run cli -- plan   --source claude

# import จริง
bun run cli -- import --source claude

# UI ที่เพิ่งคลิกผ่านมา เหนือข้อมูลของคุณเอง
bun run ui                        # http://127.0.0.1:4320
```

รันครั้งแรกจริง บนอีกเครื่อง ไว้อ้างอิง:

```
bun install --frozen-lockfile     81 packages, 7.6s
bun run smoke                     SMOKE PASS · 163/163 · all 9 stages
plan   --source claude            103 found / 103 new / 0 changed / 0 shrunk
import --source claude            13,006 records → 6,145 events · 0 corrupt · 0 duplicates
import (re-run)                   102 unchanged · 85 duplicates rejected · 1 inserted
ui                                127.0.0.1:4320 · 6,146 events · 103 files
```

`1 inserted` บนรันที่สอง คือหลักฐาน idempotency ที่ดีที่สุดที่ tool ให้ได้: ไฟล์
เดียวที่เปลี่ยนคือ **transcript ของ session ตัวเอง** ที่ยังเขียนอยู่ มัน re-parse
จำ block เดิม 85 อันได้ เอาแค่อันใหม่หนึ่งอัน

---

## กฎการออกแบบข้อเดียวที่ควรจำ

จาก README ของ project เอง:

> **Embed later.** Plain rows and vector indexes live in separate LanceDB
> stores.

ไม่ใช่แค่ guideline — เป็นคนละ class เลย `src/database.plain.ts` connect ทันทีที่
เปิด `src/database.vector.ts` *ปฏิเสธจะ connect เลย* ถ้า directory ของมันไม่มี
import เลย **เชื่อมกับ embedding service ไม่ได้** แม้จะโดยบังเอิญ

ทำไมถึงสำคัญ: embedding ช้า แพง แล้วก็พังในแบบที่ ingestion ไม่พัง ผูกสองอย่างนี้
เข้าด้วยกัน provider ล่มทีเดียวก็หยุดบันทึกอะไรได้เลย แยกกันไว้ import ยังเป็น
operation ที่ถูก idempotent แล้วก็ offline ได้อยู่ — vector กลายเป็นของที่เพิ่มทีหลัง
บน copy ด้วย provider ที่ระบุชื่อไว้บนจอ

อยากได้เวอร์ชันยาว repo มีคอร์สแปดตอนใน
[`lessons/`](https://github.com/Soul-Brews-Studio/lanceglass/tree/main/lessons)
จาก `01-choose-db` ถึง `08-optional-embeddings`

---

## อ้างอิง

| | |
|---|---|
| Repo | <https://github.com/Soul-Brews-Studio/lanceglass> · MIT |
| Demo | <https://lanceglass-fixture-demo.laris.workers.dev/> |
| Build | `v26.9.1-alpha.1401` |
| Runtime | Bun 1.3+ · `@lancedb/lancedb` 0.27.2 · `apache-arrow` 18.1.0 |
| UI | React 19 · Vite · `three` 0.185 สำหรับ 3D map |
| คอร์ส | `lessons/01-choose-db` … `08-optional-embeddings` |
| UI state gallery | [`docs/ui-state-gallery.md`](https://github.com/Soul-Brews-Studio/lanceglass/blob/main/docs/ui-state-gallery.md) — อีก 19 screenshot |

---

🤖 ตอบโดย digger จาก Nat → digger-oracle
