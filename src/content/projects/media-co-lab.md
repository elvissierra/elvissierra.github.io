---
title: Media Co-Lab
summary: A multi-tenant media collaboration platform. Orgs contain teams, teams upload and label media, and every item carries a comment feed and a live WebSocket relay. Isolation holds at three layers instead of resting on one query filter.
tags: [Python, Django & DRF, Vue.js, PostgreSQL, Docker]
order: 4
cover: /images/projects/media-co-lab/MediaColab1.gif
coverAlt: Media Co-Lab collaboration interface
gallery:
  - { src: /images/projects/media-co-lab/MediaColab2.gif, caption: 'Organizational layout' }
  - { src: /images/projects/media-co-lab/MediaColab3.gif, caption: 'Labeling and tagging system' }
  - { src: /images/projects/media-co-lab/MediaColab4.gif, caption: 'Media discussions' }
  - { src: /images/projects/media-co-lab/MediaColab5.gif, caption: 'Team-based views' }
---

## How it works

- Multi-tenant collaboration platform: organizations contain teams, teams upload and label media, and every media item carries a comment feed plus a live WebSocket relay.
- Django + DRF backend exposing authenticated REST APIs, with a Vue 3 SPA mirroring the resource tree through Vuex.
- A two-sided human approval workflow (platform admins approve orgs, org admins approve members) gates access before any query runs.
- Typed labeling system with a validated custom-type escape hatch enforced at the model layer, so every write path inherits the same invariant.

## Architecture & tradeoffs

- Isolation is layered three ways, an approval-status gate, scoped ORM query paths back to the org, and explicit object-level ownership checks on writes, rather than resting on a single filter.
- I chose Knox (server-side, revocable) over JWTs so an admin revoking access takes effect immediately, at the cost of a stateful token store.
- Honest gap: the WebSocket relay doesn't yet authenticate connections. It's bounded by the fact that nothing sent over the socket persists and room names are unguessable UUIDs, but it's the top item on the hardening list.
- Caught and fixed a live bug through self-audit: an endpoint treated a many-to-many manager as a single object, causing a 500 on every call. It's fixed, with a regression test in place.
