---
layout: ../../../layouts/DocsLayout.astro
title: Setup & Configuration Commands
---

# Setup & Configuration

Welcome to the foundation of your `agit` experience! These commands are all about getting your environment ready to record, and making sure the CLI is tailored to your setup.

## `agit init`

<video src="/vhs/init.mp4?v3" autoplay loop muted playsinline></video>

**The 'Why'**
Before `agit` can track anything, it needs to be hooked up to your AI coding agents. `agit init` does all the heavy lifting for you by scanning your environment, discovering supported agents (like Claude Code, GitHub Copilot CLI, etc.), and installing the necessary hooks or extensions.

**The 'How'**
Simply run:

```sh
agit init
```

This is the first command you should run in a repository that you want to observe. It securely backs up your agent configurations (saving them as `*.agit.bak`) before making any changes. If you ever need to forcefully overwrite a malformed configuration file, you can run `agit init --force`.

## `agit uninstall`

<video src="/vhs/uninstall.mp4?v3" autoplay loop muted playsinline></video>

**The 'Why'**
Sometimes you need to pause recording, or perhaps you're migrating to a different machine. `agit uninstall` cleanly removes all the `agit` hooks from your agent configurations without touching the rest of your settings.

**The 'How'**
When you want to stop `agit` from listening, simply type:

```sh
agit uninstall
```

It safely unregisters `agit`, leaving your AI agents exactly as they were before `agit init`.

## `agit version`

<video src="/vhs/version.mp4?v3" autoplay loop muted playsinline></video>

**The 'Why'**
Whenever you're diagnosing an issue, setting up a new machine, or reading the latest changelog, you'll need to know exactly which version of `agit` you're running.

**The 'How'**
Just type:

```sh
agit version
```

This prints the current version (e.g., `1.24.0`). It's always a good idea to include this output when reporting bugs or asking for help!

## `agit completion`

<video src="/vhs/completion.mp4?v3" autoplay loop muted playsinline></video>

**The 'Why'**
Nobody likes typing out full command names and flags! `agit completion` generates an autocomplete script for your favorite shell, making your workflow significantly faster and typo-free.

**The 'How'**
Depending on your shell, run:

```sh
# For bash
source <(agit completion bash)

# For zsh
source <(agit completion zsh)

# For fish
agit completion fish | source
```

Add the corresponding command to your shell's startup script (like `.zshrc` or `.bashrc`) to have autocomplete available every time you open a terminal.
