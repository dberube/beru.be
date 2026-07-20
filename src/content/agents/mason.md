---
name: "Mason"
summary: "A hands-on development agent that turns product direction into working software, from prototype through deployment."
date: 2026-07-20
updated: 2026-07-20
stack: ["Hermes", "Codex", "Claude Code", "GitHub", "Proxmox"]
status: live
runs_on: "Homelab Proxmox VPS"
screenshot: "../../assets/screenshots/mason-agent.png"
draft: false
---

Mason is a development agent I work with through chat. I give it product direction, and it turns that direction into working software: exploring an idea, building and testing features, working across repositories, and getting finished apps running.

Mason works in the homelab development environment on a dedicated Proxmox VPS. It builds in the local development workspace, keeps multiple apps running independently, and can take a project from prototype through deployment. With access to coding agents including Codex and Claude Code, it handles both direct implementation and larger, multi-agent development work.
