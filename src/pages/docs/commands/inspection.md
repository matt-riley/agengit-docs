---
layout: ../../../layouts/DocsLayout.astro
title: Inspecting History Commands
---

# Inspecting History

One of `agit`'s superpowers is acting as a time machine for your AI agent's actions. These commands allow you to look back, inspect details, and figure out exactly what happened, step by step.

## `agit status`

**The 'Why'**
Just like `git status`, you need a quick overview of what's currently happening in your repository. `agit status` acts as your investigation dashboard, giving you a top-level summary of your recorded agent history.

**The 'How'**
To get a bird's-eye view, run:
```sh
agit status
```
Use this when you want to see if `agit` is currently tracking active sessions and get a quick pulse on your repository's state.

## `agit timeline`

**The 'Why'**
When an agent completes a complex task, you might want to review its exact chain of thought. `agit timeline` shows you all recently recorded steps across *all* sessions in reverse chronological order. It's the ultimate audit log for your AI's activity.

**The 'How'**
Run:
```sh
agit timeline
```
This is particularly useful when you return to a project after a coffee break and want to see what your background agent was up to while you were away.

## `agit sessions`

**The 'Why'**
Agents perform work in distinct "sessions" (like a conversation thread). Over time, your `.agit` store will accumulate many sessions. This command lists them all, helping you identify specific tasks or conversations.

**The 'How'**
Run:
```sh
agit sessions
```
This outputs a clean list of all recorded sessions, allowing you to grab a specific session ID to use with commands like `agit log` or `agit diff`.

## `agit log`

**The 'Why'**
If `agit timeline` is a global view, `agit log` is a focused view. It shows you the specific step history for a single session, making it easy to follow the narrative of one specific task from start to finish.

**The 'How'**
To view the most recent session's log:
```sh
agit log
```
To view a specific session (grab the ID from `agit sessions`):
```sh
agit log <SESSION_ID>
```

## `agit show`

**The 'Why'**
Every step an agent takes is recorded with a unique BLAKE3 hash. When you need to drill down into the absolute minutiae of a single step—what tools were used, what files were changed, what the exact prompt was—`agit show` is your magnifying glass.

**The 'How'**
Pass the step's hash to see the details:
```sh
agit show abc123def
```
You can also use flags like `--files` or `--stat` to see a summary of the file changes that happened during this exact step.

## `agit diff`

**The 'Why'**
Seeing that a file changed is good, but seeing *how* it changed is better. `agit diff` lets you render a standard diff for a specific step, between two steps, or even across an entire session.

**The 'How'**
To see what changed in a specific step compared to its parent:
```sh
agit diff abc123def
```
To see what changed across an entire session:
```sh
agit diff --session <SESSION_ID>
```

## `agit between`

**The 'Why'**
Sometimes you're tracking down a bug, and you know it was introduced between two specific Git commits. `agit between` correlates Git history with `agit` history, showing you all the agent steps that occurred between two Git revisions.

**The 'How'**
Provide the Git commit ranges:
```sh
# Show all agent steps after a specific commit
agit between abc123def

# Show agent steps between two specific commits
agit between abc123def fed321cba
```

## `agit cat`

**The 'Why'**
For the true power users! `agit cat` prints the raw, unformatted object content from the `.agit` store based on its BLAKE3 hash. It's an essential tool for debugging the store itself or writing custom scripts that parse raw `agit` data.

**The 'How'**
```sh
agit cat abc123def
```
Use this when you need to bypass the pretty-printing of `agit show` and get straight to the raw JSON bytes.
