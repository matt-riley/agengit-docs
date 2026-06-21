---
layout: ../../layouts/DocsLayout.astro
title: Data Formats
description: Understanding how AgenGit structures and exports data.
---

# 📦 Data Formats

Ever wondered what AgenGit's data actually looks like when you peek under the hood or export your sessions? We've designed our data formats to be robust, predictable, and easy to parse.

Here's a friendly tour of the primary formats you'll encounter when working deeply with AgenGit.

## 🕵️‍♂️ Blame v1 (`agit blame`)

Just like `git blame` tells you who last modified a line of code, `agit blame` answers: _"Which agent step last changed this line?"_

**How it works:**
AgenGit stores a **Blame object** as a JSON file mapping every line of a file to the exact agent step that last changed it. It's stored using a content-addressed BLAKE3 hash.

**The Why:** We calculate this incrementally after a step is committed. By diffing the new content against the previous version, we attribute changed lines to the new step while keeping the old attributions for unchanged lines. Because every session records snapshots of the _same_ working tree, you get a beautiful, unified timeline across all your agent sessions!

_Note: `agit blame` also supports an optional `model` field. For CLIs that expose it, it can tell you exactly which model (e.g. `claude-sonnet-4-6`) touched a line, not just the CLI origin._

_Note: Renaming files or deleting/recreating them breaks the continuity in v1, but it works flawlessly for standard text file edits!_

## 🧳 Portable Bundles (`agit export` / `import`)

Need to share a recorded session with a teammate, back it up offline, or migrate to a new machine without bringing along all the messy internal caches? Enter **Portable bundles**.

**How it works:**
Running `agit export` creates a clean, portable directory containing only the canonical session references and reachable objects.

A typical bundle looks like this:

```text
bundle/
  manifest.json           # The roadmap of your bundle
  objects/                # The actual file and step data
  refs/sessions/          # Session pointers
  privacy-report.json     # (Optional) If sensitive data was detected
```

**The Why:** We explicitly exclude host-local state (like `index.db`, logs, and temporary files) so bundles remain lightweight and safe to share. `manifest.json` acts as the source of truth, ensuring that when you run `agit import`, AgenGit validates everything perfectly before writing a single byte to your local store.

## 🤖 CLI JSON v1

Building tools on top of AgenGit? We've got you covered. Instead of scraping text output, commands that support machine-readable data (like `status`, `log`, `show`, `doctor`) use our **CLI JSON v1** envelope.

**How it works:**
Pass the `--json` flag to supported commands, and you'll get a clean, predictable JSON response:

```json
{
  "schema_version": "cli-json-v1",
  "command": "status",
  "data": {
    // Command-specific goodness lives here!
  }
}
```

**The Why:** Stability is key. By wrapping all JSON output in this standard envelope, any scripts, plugins, or CI/CD pipelines you build will parse errors and data predictably, no matter which command you run. If something goes wrong (like running `agit` outside a repository), the `data` payload will include a stable error `code`, a human-readable `message`, and even a helpful `hint`.

---

_Ready to parse some data? Give `agit log --json` a spin and see the raw power of AgenGit's structured output!_
