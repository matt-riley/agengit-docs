---
layout: ../../layouts/DocsLayout.astro
title: Getting Started
---

# Getting Started

Welcome to **agengit**! If you're building software with AI agents, you know the feeling: you let the agent loose, it does a bunch of stuff, and then makes a massive Git commit. _What just happened?_

`agit` is a CLI that records AI-agent coding activity into a local `.agit/` store so you can inspect what happened _between_ commits.

Let's get it installed and tracking your agents in seconds.

## Install

The easiest way to install `agengit` on macOS or Linux is via Homebrew.

### Homebrew (Recommended)

You can install `agengit` directly from the `matt-riley/tools` tap:

```sh
brew tap matt-riley/tools
brew install matt-riley/tools/agit
```

### Pre-built Binaries

You can also download a pre-built binary for your platform directly from our GitHub releases.

#### macOS / Linux

Download the right archive for your architecture:

- `agit-x86_64-linux.tar.gz`
- `agit-aarch64-linux.tar.gz`
- `agit-aarch64-macos.tar.gz`
- `agit-x86_64-macos.tar.gz`

Extract and install:

```sh
tar -xzf agit-x86_64-macos.tar.gz
sudo mv agit /usr/local/bin/
agit version
```

### Building from source

If you prefer to compile it yourself, you'll need [Zig](https://ziglang.org) `0.16.0`.

```sh
git clone https://github.com/matt-riley/agengit
cd agengit
zig build -Doptimize=ReleaseSafe
./zig-out/bin/agit version
```

## Quick Start

We designed `agengit` to be insanely easy to set up. Once the CLI is installed, navigate to any repository you want to observe and run:

```sh
agit init
```

That's it!

`agit init` discovers supported agent CLIs on your `PATH` and installs hook commands into their user config files. It writes generated recorder extensions for agents that expose public hooks. Don't worry, it creates `*.agit.bak` backups of any files it touches before modifying them.

## Supported Integrations

Right now, `agengit` seamlessly hooks into these tools:

| Agent                  | Installed hooks                                             |
| ---------------------- | ----------------------------------------------------------- |
| **Claude Code**        | `SessionStart`, `UserPromptSubmit`, `PostToolBatch`, `Stop` |
| **OpenAI Codex CLI**   | `UserPromptSubmit`, `PostToolUse`, `Stop`                   |
| **Google Gemini CLI**  | `BeforeModel`, `AfterTool`, `AfterAgent`                    |
| **GitHub Copilot CLI** | Generated extension `agit-recorder/extension.mjs`           |
| **Pi**                 | Generated extension (auto-discovered)                       |

## What gets recorded?

Once initialized, the `.agit/` directory will start capturing:

- Agent origins and session identifiers
- Every message and prompt
- Tool calls and outputs
- Workspace snapshots
- Content-addressed object hashes

Think of it like this: **Git tracks your commit history. `agengit` tracks your agent's execution history.**

Ready to dive deeper? Check out the [Commands](/docs/commands) to see how to investigate and view this data!
