---
layout: ../../../layouts/DocsLayout.astro
title: Advanced Commands
---

# Advanced Usage

These commands are for experimental features, power users, and specific recovery workflows. If you're building integrations or trying to recover from a serious misstep by an AI agent, you'll find these tools invaluable.

## `agit observe`

**The 'Why'**
`agit observe` is an experimental tool used primarily for development and testing. It allows `agit` to ingest events from alternative observer sources (like raw JSON fixtures) rather than listening to live agent hooks. This is perfect for simulating agent activity without actually running an LLM.

**The 'How'**
To process a fixture-backed observer file once:

```sh
agit observe --once fixture --input observer.json
```

_Note:_ Current experimental sources run a single pass and save watermarks under `.agit/observers/` so that if you rerun the command, it knows to suppress duplicates.

## `agit watch`

**The 'Why'**
If `agit timeline` is a snapshot of what just happened, `agit watch` is a live-updating stream. It polls the local SQLite index for newly finalized agent steps and prints them to the terminal in near-real-time. It's fantastic for monitoring a background agent's progress without constantly spamming `agit status`.

**The 'How'**
Start watching the stream:

```sh
agit watch
```

Because it polls the database, it's not strictly event-driven. If you're writing a CI script and just need a one-shot output, stick to `agit timeline`. But if you're actively monitoring, `watch` is the way to go.

## `agit restore`

**The 'Why'**
Agents make mistakes. Sometimes they delete a file they shouldn't have, or mangle a function beyond recognition. Because `agit` takes snapshots of the workspace at every step, `agit restore` lets you reach back into a captured step and copy those files directly back into your current working tree. It's your ultimate "undo" button for AI coding.

**The 'How'**
To restore a specific file from a known step hash (which you can find via `agit timeline` or `agit log`):

```sh
agit restore abc123def -- src/main.zig
```

_Safety Guardrails:_ By default, `agit` won't blindly overwrite existing files unless you pass the `--force` flag. If you want to restore the entire project tree to that exact step, you must explicitly use the `--all` flag.
