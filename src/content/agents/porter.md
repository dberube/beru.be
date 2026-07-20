---
name: "Porter"
summary: "A home-lab networking agent that keeps development services reachable, routed, and connected."
date: 2026-07-20
updated: 2026-07-20
stack: ["Networking", "Caddy", "DNS", "Proxmox"]
status: live
runs_on: "Homelab Proxmox VPS"
screenshot: "../../assets/screenshots/porter-agent.png"
draft: false
---

Porter handles the networking layer for my home lab. It connects development services to the outside world by managing routes, DNS, reverse-proxy configuration, and the paths between running apps and their public subdomains.

When a new project needs to be reachable, Porter provisions the network side of the setup so the app can stay focused on the software itself. It helps keep the development environment organized as multiple services run across the homelab.
