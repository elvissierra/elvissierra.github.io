---
title: ShopFloor
summary: A manufacturing execution and quality-tracking system covering departments, work orders, routings, bills of materials, and a floor-plan editor for drawing zones straight onto an SVG map of the plant. All of it sits behind one typed GraphQL API.
tags: [Python, FastAPI, GraphQL, PostgreSQL, Vue.js]
order: 3
cover: /images/projects/shopfloor/ShopFloor1.png
coverAlt: ShopFloor operations dashboard
gallery:
  - { src: /images/projects/shopfloor/ShopFloor1.png, caption: 'Operations dashboard: departments, work centers, and parts at a glance' }
  - { src: /images/projects/shopfloor/ShopFloor2.png, caption: 'Interactive floor map with zones drawn per floor' }
  - { src: /images/projects/shopfloor/ShopFloor3.png, caption: 'Department management with search and floor-map shortcuts' }
  - { src: /images/projects/shopfloor/ShopFloor4.png, caption: 'Work centers linked to their departments' }
---

## How it works

- Manufacturing execution system: departments own parts, parts get quality-checked and can carry logged defects, and a second layer models work orders, routings, and bills of materials.
- Floor-plan editor: click-to-draw polygon zones on an SVG plant layout, snapped to a grid and linked to real work centers and departments.
- A single FastAPI + Strawberry GraphQL endpoint over 16 SQLAlchemy models, with a Vue 3 frontend.

## Architecture & tradeoffs

- Deliberately flat GraphQL schema (no nested relational fields): every resolver is a single indexed query with zero N+1 risk, at the cost of pushing multi-entity joins onto the client.
- Repository and service layers are split, so validation and error codes live in one place, independent of the HTTP/resolver layer.
- Found through self-audit, not a live incident: the Alembic migration history hadn't been regenerated after the schema grew, so 10 of 16 tables wouldn't exist on a genuinely fresh deploy. I traced the gap, confirmed the fix was a single command away, and documented it before it could surprise anyone.
