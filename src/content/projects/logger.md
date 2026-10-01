---
title: Logger
summary: A full-stack time tracker with a drag-and-drop weekly grid. The CRUD is the easy part. The work I'd point to is the auth layer, refresh tokens that rotate with real reuse detection (RFC 6819), and a single-flight guard so a burst of concurrent requests can't log a valid session out.
tags: [Python, FastAPI, Vue.js, PostgreSQL, Docker]
order: 2
cover: /images/projects/logger/Logger1.png
coverAlt: Logger weekly planner with a running project timer
gallery:
  - { src: /images/projects/logger/Logger1.png, caption: 'Weekly planner with daily plan and a running project timer' }
  - { src: /images/projects/logger/Logger2.png, caption: 'Per-project boards tracking entries against the 40-hour week' }
  - { src: /images/projects/logger/Logger3.png, caption: 'Weekly log grid grouped by project' }
  - { src: /images/projects/logger/Logger4.png, caption: 'Dark mode' }
  - { src: /images/projects/logger/Logger5.png, caption: 'Quick-add entries and timers across the week' }
  - { src: /images/projects/logger/Logger6.png, caption: 'Project priority and notes' }
  - { src: /images/projects/logger/Logger7.png, caption: 'Entry editor: job title, project code, activity, and time range' }
---

## How it works

- Weekly planning and time logging: daily plan, per-project boards, and a drag-and-drop weekly grid.
- Start/stop timer state machine: it stops the running entry, rounds its end time up to a clean increment, and starts the next entry exactly where the last one stopped, so there's no gap and no overlap.
- Projects auto-provision from a typed code the first time it's used, with no separate "create project" step.
- FastAPI backend with a Vue 3 frontend, cookie-based auth throughout.

## Architecture & tradeoffs

- Auth is the most production-grade part of the app. HttpOnly cookies (not localStorage) close off XSS token theft, and refresh tokens rotate on every use with reuse detection per RFC 6819, so replaying an old token burns the entire session family.
- I hit and fixed a real race during development: a burst of concurrent 401s each tried to refresh independently, and the second call always looked like token reuse. A single-flight guard fixed it, so concurrent requests share one refresh call.
- Honest gap: "only one running timer per user" is enforced with a check-then-act query, not a database constraint. It's a real concurrency race under load, with a known fix (a partial unique index) not yet shipped.
