---
name: TMS improvement recommendations
overview: "Assess the current Laravel 12 + Inertia React project and propose prioritized enhancements: feature improvements, new value-add functionality, performance/scalability upgrades, and maintainability/architecture refactors—anchored to concrete files in the repo."
todos: []
isProject: false
---

## Current snapshot (high-signal)

- Newsletter module is the most actively changing surface area (controllers/models/jobs/requests/policies + React pages).
- There are **runtime-breaking mismatches** (routes call controller methods that don’t exist; missing Inertia import) and **data integrity inconsistencies** (subscriber

