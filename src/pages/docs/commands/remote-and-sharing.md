---
layout: ../../../layouts/DocsLayout.astro
title: Remotes & Sharing Commands
---

# Remotes & Sharing

By default, all `agit` data is stored locally on your machine in the `.agit/` directory. But what if you want to collaborate with a team, backup your agent's history, or migrate your data to a new laptop? That's where the remote and sharing commands come in!

## `agit push`

**The 'Why'**
You wouldn't leave your Git commits unpushed, and you shouldn't leave your `agit` history stranded on your local machine either. `agit push` uploads all reachable objects and session references to an S3-compatible remote configured in your `.agit/config.json`.

**The 'How'**
After configuring your remote in `.agit/config.json`, simply run:

```sh
agit push
```

_Security Note:_ `agit push` automatically runs a local privacy scan (like `agit privacy scan`) before uploading. If it detects sensitive plaintext data (like API keys), it will refuse to upload unless you have client-side encryption configured via `encryption_secret_env`, or you explicitly bypass the check with `--allow-sensitive`.

## `agit pull`

**The 'Why'**
When a teammate has pushed agent history to your shared remote, or you're pulling down your own backups on a new machine, you need `agit pull`. It securely downloads missing objects and session references from your configured remote.

**The 'How'**

```sh
agit pull
```

If your remote data was encrypted during the push, `agit pull` will decrypt it locally and verify the integrity of the downloaded data against its BLAKE3 hash.

## `agit export`

**The 'Why'**
Sometimes you don't have an S3 remote configured, or you want to share a specific debugging session with a colleague via a zip file. `agit export` allows you to write a highly portable bundle containing selected session references and all their reachable objects directly to a folder on your disk.

**The 'How'**
Provide the path where you want the bundle saved:

```sh
# Export all recorded sessions into a bundle directory
agit export dist/bundle
```

You can then zip up the `dist/bundle` directory and share it with anyone!

## `agit import`

**The 'Why'**
If someone hands you a bundled export directory, you need a safe way to ingest it into your own local store. `agit import` brings a portable bundle into your `.agit` directory, while validating hashes and cleanly handling any reference conflicts along the way.

**The 'How'**
Point it at the exported directory:

```sh
# Import an exported bundle directory
agit import dist/bundle
```

This is perfect for offline sharing, audits, or merging disconnected agent histories.
