---
layout: ../../../layouts/DocsLayout.astro
title: Search & Analysis Commands
---

# Search & Analysis

As your repository grows, finding specific agent actions becomes crucial. These commands help you search through history, analyze behavior, and extract meaningful insights from your AI's past work.

## `agit recall`

<video src="/vhs/recall.mp4" autoplay loop muted playsinline></video>

**The 'Why'**
When an agent starts a new task, it needs context. `agit recall` is an agent-initiated "pull memory" mechanism that allows an agent (or you!) to retrieve prior recorded steps to inform the current task. Think of it as a contextual search engine for your project's agent history.

**The 'How'**
You can search by querying terms, filtering by specific file paths, or both:

```sh
# Recall recent work related to a specific file
agit recall --path src/main.zig

# Recall past steps matching a search term
agit recall "refactoring network requests"
```

This is incredibly powerful for keeping agents aligned with previous decisions and architectural patterns.

## `agit grep`

<video src="/vhs/grep.mp4" autoplay loop muted playsinline></video>

**The 'Why'**
Need to find exactly when an agent used a specific API, or search for a specific error message across all past agent sessions? `agit grep` searches through recorded messages, tool activity, and captured file content across _all_ sessions in your repository.

**The 'How'**
Simply provide your search query:

```sh
# Search all sessions for instances of the word 'factorial'
agit grep factorial
```

It's an indispensable tool for auditing tool usage and finding lost context across multiple days of AI pair programming.

## `agit blame`

<video src="/vhs/blame.mp4" autoplay loop muted playsinline></video>

**The 'Why'**
Just like `git blame` tells you _who_ wrote a line of code, `agit blame` tells you _which agent step_ resulted in a line of code. It provides per-line step attribution, helping you understand exactly when and why an AI made a specific code change.

**The 'How'**
Run it against a specific file:

```sh
# Show line-by-line agent blame for a file
agit blame src/main.zig
```

_Note:_ For extremely large files, `agit` caps the read size to keep things fast (using the `AGIT_MAX_FILE_BYTES` limit). You can disable this limit for a single run by passing the `--no-limits` flag.

## `agit eval`

<video src="/vhs/eval.mp4" autoplay loop muted playsinline></video>

**The 'Why'**
How do you know if an agent did a good job? `agit eval` evaluates captured agent sessions using evidence-based quality signals (like whether the code compiled, if tests passed, or if the agent struggled with errors). It's an automated quality check on your agent's performance.

**The 'How'**
To evaluate the most recently recorded session:

```sh
agit eval
```

_Keep in mind:_ These classifications are evidence-based signals from captured history. They provide an excellent summary of the session's health, but they are not absolute proof of code correctness or production readiness!

## `agit stats`

<video src="/vhs/stats.mp4" autoplay loop muted playsinline></video>

**The 'Why'**
If you want to understand the big picture of how AI is being used in your repository, `agit stats` provides the analytics. It summarizes recorded sessions, steps, tool usage frequencies, and file-change activity across your entire store.

**The 'How'**
Get your repository-wide analytics by running:

```sh
agit stats
```

This reads directly from your local SQLite index. If the stats look stale or out of sync after a major update, you might need to run `agit reindex` to freshen up the database.
