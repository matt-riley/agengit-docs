---
layout: ../../../layouts/DocsLayout.astro
title: Maintenance & Health Commands
---

# Maintenance & Health

Just like any database or version control system, your `.agit` store needs a little TLC from time to time. These commands help you keep the store healthy, secure, and performant.

## `agit doctor`

<video src="/vhs/doctor.mp4?v2" autoplay loop muted playsinline></video>

**The 'Why'**
If `agit` isn't recording data or something feels broken, `agit doctor` is your first stop. It performs a comprehensive health check on your local store, verifies that your agent hooks are properly installed, and alerts you to any configuration issues. It also reports if binary moves have made your hook paths stale (though package-manager symlinks generally reduce this issue).

**The 'How'**
To run a full checkup:

```sh
agit doctor
```

If you recently experienced a capture failure where a hook didn't fire, you can also run:

```sh
agit doctor --last-hook-error
```

This will print out exactly why the agent integration failed without breaking your coding session.

## `agit fsck`

<video src="/vhs/fsck.mp4?v2" autoplay loop muted playsinline></video>

**The 'Why'**
Corrupt data is a nightmare. `agit fsck` (File System Consistency Check) verifies the integrity of all your BLAKE3-hashed objects, references, the SQLite index, and the `.agit/tmp` staging area. It ensures that the cryptographic hashes actually match the data on disk.

**The 'How'**
Run a read-only scan:

```sh
agit fsck
```

It's a good habit to run this occasionally, especially before pushing data to a remote server.

## `agit gc`

<video src="/vhs/gc.mp4?v2" autoplay loop muted playsinline></video>

**The 'Why'**
Over time, as agents rewrite files and discard old paths, your `.agit` store might accumulate unreachable "loose" objects and stale temporary files. `agit gc` (Garbage Collection) prunes this dead weight, potentially repacking reachable data to save disk space.

**The 'How'**

```sh
agit gc
```

This command safely cleans up old data while respecting a default grace period, so it won't delete data from active, ongoing sessions.

## `agit privacy scan`

<video src="/vhs/privacy.mp4?v2" autoplay loop muted playsinline></video>

**The 'Why'**
AI agents sometimes handle API keys or sensitive data. While `agit` tries to automatically redact secrets based on its `.agit/config.json` policy, it's always best to verify. `agit privacy scan` scours your captured content for sensitive data—and it does so without ever printing the secret values to the terminal.

**The 'How'**
Run the scan before sharing your screen or pushing data:

```sh
agit privacy scan
```

If it finds anything sensitive, it will exit with a non-zero status code, giving you a chance to review the data before it leaves your machine.

## `agit reindex`

<video src="/vhs/reindex.mp4?v2" autoplay loop muted playsinline></video>

**The 'Why'**
`agit` relies on a fast SQLite index (`.agit/index.db`) to power commands like `timeline` and `stats`. If you've just upgraded `agit`, or if `agit doctor` reports that the index is out of sync with the raw objects, you need to rebuild it from the ground up.

**The 'How'**

```sh
agit reindex
```

This reads the canonical history directly from your `.agit/objects/` folder and repopulates the SQLite index, making all your search and reporting commands fast and accurate again.
