<div align="center">

# ESD — Enterprise Script Dispatcher

**A lightweight, modular JavaScript automation framework for enterprise QC workflows**

![Version](https://img.shields.io/badge/version-11.1.7.1.4-blue?style=flat-square)
![Language](https://img.shields.io/badge/language-JavaScript-yellow?style=flat-square)
![Platform](https://img.shields.io/badge/platform-Tampermonkey%20%7C%20Greasemonkey-green?style=flat-square)
![Status](https://img.shields.io/badge/status-Active-brightgreen?style=flat-square)

</div>

---

## Overview

**ESD (Enterprise Script Dispatcher)** is a modular userscript automation framework designed to streamline and enforce quality control workflows in enterprise production environments.

Built to replace manual, error-prone review processes with automated, deterministic enforcement logic — ESD injects structured validation layers directly into web-based QC platforms, reducing human error and improving throughput consistency across distributed remote teams.

> Developed to support high-volume QC pipelines processing **1,000+ items/day** with a target accuracy rate of **98–99%**.

---

## Key Features

- **Automated workflow enforcement** — reduces manual review steps through script-driven logic
- **Modular architecture** — core engine decoupled from loader for clean separation of concerns
- **Versioned release management** — tracked via `version.txt` with semantic versioning
- **Enterprise refactor support** — `qc-enterprise-new.user.js` introduces restructured logic
- **Config-driven behavior** — runtime configuration separated from core logic
- **License-controlled distribution** — access managed via `license.json`

---

## Repository Structure
oslo/
├── loader.user.js # Script loader & injection handler
├── qc-enterprise.user.js # Core QC automation engine (stable)
├── qc-enterprise-new.user.js # Refactored engine (next iteration)
├── qc-enterprise.txt # Runtime configuration & rules
├── version.txt # Semantic versioning tracker
└── license.json # License & distribution control

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | JavaScript (ES6+) |
| Runtime | Tampermonkey |
| Architecture | Modular script injection with loader pattern |
| Config | Plain-text rule definitions |
| Distribution | License-gated, private deployment |

---

## How It Works

1. `loader.user.js` is injected by Tampermonkey on target platform load
2. It dynamically loads the core engine and reads configuration from `qc-enterprise.txt`
3. The engine applies structured validation logic to the platform's DOM
4. Version state is tracked in `version.txt` for staged rollouts

---

## Impact

| Metric | Result |
|---|---|
| Daily throughput | 2,500+ items/day |
| Accuracy rate | 98–99% |
| Revision rate reduction | ↓ 25% |
| Team efficiency improvement | ↑ 20% |
| Client revision requests | ↓ 30% |
| Active commits | 43+ |

---

## Security Considerations

- Script execution is **sandboxed** within the browser userscript engine
- No external API calls — all logic runs client-side
- License validation via `license.json` controls authorized deployment
- Configuration is separated from logic for auditable rule changes

---

## Roadmap

- [ ] Migrate configuration to structured JSON for schema validation
- [ ] Add telemetry hooks for error logging and reconciliation
- [ ] REST API integration layer for external platform connectivity
- [ ] Unit test coverage (Jest)
- [ ] CI/CD via GitHub Actions for automated linting and versioning

---

## Author

**Andrew Christofer Geraldo**  
AI Augmented Developer / System Architect / Data Specialist  
📍 Jakarta Metropolitan Area  
🔗 [linkedin.com/in/andrew-cg](https://www.linkedin.com/in/andrew-cg)
