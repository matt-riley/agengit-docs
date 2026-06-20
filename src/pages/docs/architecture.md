---
layout: ../../layouts/DocsLayout.astro
title: Architecture
description: Learn how AgenGit is built under the hood.
---

# 🏗️ AgenGit Architecture

Welcome to the inner workings of AgenGit! If you're curious about how we safely record your AI agent's coding sessions without getting in the way, you're in the right place. 

We've designed AgenGit to be reliable, crash-safe, and unobtrusive. Let's dive into some of the core architectural decisions that make this happen.

## 📁 The `.agit/` Store Directory

You might have noticed a new `.agit/` folder pop up in your repository when you run `agit init`. Why not hide our data somewhere else, or reuse existing folders?

**The Why:** We need one predictable place to keep your local session history—objects, references, the SQLite index, hook logs, and temporary files. By using `.agit/`, we ensure that:
- You never accidentally mix AgenGit data with other tools (like `.git` or `.regent`).
- It's crystal clear what the folder is for.
- It stays strictly out of your regular Git history (remember to add `.agit/` to your `.gitignore` or just let it naturally sit uncommitted).

## ⚡ Short-Lived, Agent-Safe Hooks

When your AI agents (like Claude Code, Codex CLI, or Gemini CLI) do their thing, they call external hook commands to let AgenGit know what's happening. 

**The Why:** We want AgenGit to be a helpful observer, not a gremlin stomping on the brakes! If our recorder hangs or crashes, it shouldn't ruin your workflow. 

To guarantee this, we keep our hook commands entirely short-lived and fail-open. Every time a hook event occurs, a fresh `agit` process spins up (e.g., `agit claude-hook user`), does its job quickly, and exits. If something breaks on our end, the hook simply catches the error, logs it to `.agit/log/hook-error.log`, and successfully returns control back to the agent. Your session keeps rolling without a hitch.

## 📸 Conservative Snapshots

With every agent step, AgenGit takes a snapshot of your workspace so it knows exactly what files changed. But taking a snapshot of *everything* is a recipe for slowness and accidentally capturing things you'd rather keep private.

**The Why:** Perfect safety is hard, but sensible defaults keep the treasure chest free of dragons! We enforce a **conservative snapshot policy**:
- **Ignored by default:** Common build directories (`node_modules/`, `target/`, `.cache/`), version control (`.git/`, `.agit/`), and generated artifacts.
- **Secrets protected:** We skip `.env` files, SSH keys, certificates (`*.pem`, `*.p12`), and other common secret-bearing files. 
- **Hard limits:** We automatically skip binary files, symlinks, and any file larger than 10 MiB (configurable via `AGIT_MAX_FILE_BYTES`).

You can always customize this by creating an `.agitignore` file in your repository.

## 🗂️ SQLite Index vs. Canonical Objects

Under the hood, AgenGit stores your history as immutable, content-addressed objects (similar to Git, using fast BLAKE3 hashes). However, querying raw objects is slow. 

**The Why:** We use a local SQLite database (`.agit/index.db`) purely as a **query accelerator**. This means all your timeline views, stats, and search features are lightning-fast. Best of part? If `index.db` ever gets lost or corrupted, it's not a big deal. You can easily rebuild the entire index from the raw objects by running `agit reindex`.

---

*Want to dive even deeper? Check out the raw [Architecture Decision Records (ADRs)](https://github.com/matt-riley/agengit/tree/main/docs/adr) in the main AgenGit repository.*
