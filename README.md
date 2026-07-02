<div align="center">

<!-- Banner -->
<div align="center">

# ⚙️ ESD - QC Productivity & Data Integration Engine
### Enterprise Edition · v11.1.7.1.4

</div>

<br/>

> **A production-grade, full-stack enterprise application** built in vanilla JavaScript -  
> delivering real-time QC automation, a structured data pipeline, ML-driven volume  
> forecasting, multi-user license management, and cloud sync for a teams
> processing **1,000+ items per day**.

<br/>

</div>

---

## Table of Contents

- [Overview](#-overview)
- [File Structure](#-file-structure)
- [System Architecture](#-system-architecture)
- [Features](#-features)
  - [Frontend & UI Engine](#-frontend--ui-engine)
  - [Automation Engine](#-automation-engine)
  - [Keyboard Shortcut System](#-keyboard-shortcut-system)
  - [Data Pipeline](#-data-pipeline)
  - [ML Forecasting Engine](#-ml-forecasting-engine)
  - [Cloud Synchronization](#-cloud-synchronization)
  - [Security & License System](#-security--license-system)
- [Tech Stack](#-tech-stack)
- [State Management](#-state-management)
- [Key Design Decisions](#-key-design-decisions)
- [Impact Metrics](#-impact-metrics)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## Overview

**ESD (Enterprise Script Dispatcher)** is a self-contained, production-deployed enterprise
application built entirely in vanilla JavaScript and delivered as a browser userscript via
the Tampermonkey runtime.

Rather than building a separate web application, ESD overlays and **fully extends a legacy
enterprise QC platform** - injecting a complete UI, data collection system, automation engine,
ML forecast module, and cloud synchronization layer without any modifications to the host platform's
backend or codebase.

It runs in production for **11 licensed QC analysts**, replacing a fully manual,
spreadsheet-based workflow with a real-time automated data system.
Company : (e-commerce luxury resale platform)
Team : QC Operations - Photography & Product Review
Users : 11 licensed analysts (USER-001 to USER-011)
Throughput : 2,500+ items / day
Accuracy : 98–99% enforced
Version : 11.1.7.1.4 (actively maintained, 43+ commits)

---

## File Structure

oslo/
├── README.md                        ← You are here
│
├── loader.user.js                   ← Self-updating enterprise loader (413 lines · 21.4 KB)
│   ├── fetchWithCache()             ← 1hr TTL cache engine (anti-429)
│   ├── isNewerVersion()             ← Semantic version comparison
│   ├── showUpdateModal()            ← Update scheduler + time picker UI
│   ├── loadCoreScript()             ← Secure cloud bridge + URL whitelist
│   ├── showLoginGate()              ← User identity + admin password gate
│   ├── verifyLicense()              ← Expiry validation + user DB parsing
│   └── init()                       ← Boot chain: update → license → core
│
├── qc-enterprise-new.user.js        ← Core application engine (3,670 lines · 198 KB)
│   ├── UI Engine                    ← Dashboard, dark mode, panels, animations
│   ├── Automation Engine            ← Auto-fail, image accelerator, submit
│   ├── Data Pipeline                ← SKU extraction, fail/pass collection
│   ├── CSV System                   ← Export, import, auto-backup
│   ├── Cloud Sync                   ← Google Apps Script baseline lock
│   ├── ML Forecast                  ← 7-day weighted weekday prediction
│   └── Security Hooks               ← MutationObserver, SPA re-injection
│
├── qc-enterprise.user.js            ← Force update security gate (61 lines · 3.41 KB)
│   ├── Force-update modal           ← Full-screen overlay blocker
│   └── Anti-bypass interval         ← DOM manipulation detection (1s)
│
├── license.json                     ← User database (11 licensed analysts)
│   └── Schema: { name, active, expiry } per USER-XXX key
│
├── qc-enterprise.txt                ← Obfuscated core payload (delivery artifact)
│   └── 80.3 KB encoded artifact     ← Fetched at runtime via secure cloud loader
│
└── version.txt                      ← Current version: 11.1.7.1.4


## System Architecture

┌─────────────────────────────────── BROWSER RUNTIME ───────────────────────────────────┐
│                                                                                        │
│  ┌─────────────────────── loader.user.js (413 lines) ──────────────────────────────┐  │
│  │                                                                                  │  │
│  │   Version Check          License Gating         Cache Engine                    │  │
│  │   (semver diff)          (expiry + user          (1hr TTL,                      │  │
│  │                           DB validation)          anti-429)                     │  │
│  │                                                                                  │  │
│  │              Cloud Bridge (secure)                                               │  │
│  │              URL whitelist + GM_xmlhttpRequest                                   │  │
│  └────────────────────────────────┬─────────────────────────────────────────────────┘  │
│                                   │ injects                                            │
│                                   ▼                                                    │
│  ┌──────────────── qc-enterprise-new.user.js (3,670 lines) ──────────────────────┐    │
│  │                                                                                │    │
│  │  UI ENGINE                         DATA ENGINE                                 │    │
│  │  ├── Live Dashboard                ├── CSV Export Pipeline                    │    │
│  │  ├── Dark Mode                     ├── localStorage StateMachine              │    │
│  │  ├── Snap Panels                   ├── SKU Attribute Extraction               │    │
│  │  ├── Shortcuts                     ├── Fail/Pass Data Collection              │    │
│  │  ├── Animations                    ├── Shadow DOM                             │    │
│  │  └── ML Volume Forecasting         └── Auto-backup System                    │    │
│  │                                                                                │    │
│  └────────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                        │
│  ┌──────────────── qc-enterprise.user.js ── Force Update Security Gate ────────┐      │
│  │   Anti-bypass DOM guard (1s interval) + Scroll Lock                         │      │
│  └────────────────────────────────────────────────────────────────────────────┘       │
│                                                                                        │
│         ▼                    ▼                     ▼                                   │
│  ┌─────────────┐   ┌──────────────────┐   ┌───────────────────────┐                  │
│  │   Google    │   │     Internal     │   │     localStorage       │                  │
│  │ Apps Script │   │       API        │   │  (40+ keys, persist.)  │                  │
│  │   (Cloud)   │   │  /qc_tool/fetch_ │   │                        │                  │
│  │  Baseline   │   │  State Machine   │   │  First-Writer-Wins     │                  │
│  │  Sync +     │   │  ready_for_qc_   │   │  Lock (persistent)     │                  │
│  └─────────────┘   └──────────────────┘   └───────────────────────┘                  │
└────────────────────────────────────────────────────────────────────────────────────────┘

---

## Features

### Frontend & UI Engine

ESD injects a complete, production-grade UI system directly into the QC platform's DOM -
no external framework, no bundler, no build step.

| Feature | Implementation |
|---|---|
| **Live QC Dashboard** | Real-time pass/fail counters, progress bars, pacing targets - refreshed every 2s |
| **Dark Mode** | Full CSS injection with borderless slate theme, persisted via localStorage |
| **Magnetic Snap Panels** | 8-directional panel linking with `ResizeObserver` for auto-save of dimensions |
| **Smart Submit** | 1-5s configurable countdown with ESC cancel, neon flash feedback |
| **Squish Animations** | Web Animations API micro-interactions on every QC action |
| **Shadow DOM** | Isolated animation layer - prevents style leakage, eliminates flicker |
| **Resizable Panels** | Drag-to-resize with automatic dimension persistence |
| **Performance Tracker** | `DOMContentLoaded` + full load timing logged on every session |
| **Auto-Start QC** | `Enter` key from homepage triggers queue entry automatically |

---

### Automation Engine
Click(element)
└── Dispatches: mousedown → mouseenter → mouseover → click → mouseup
└── Adds random jitter (80–450ms) to simulate real timing

processNextMultiFail(reasonValue)
└── Batch-fail robot - loops through staged fails with configured reason
└── Applies humanized delays between each action

scanEnterpriseWorkload() [every 3s]
└── Broken image retry + lazy loading bypass
└── Detects and flags anomalous SKU states

triggerUniversalSubmit()
└── Smart submit with countdown, ESC cancel, and neon flash
└── Event delegation - works across all dynamic DOM states

MutationObserver [always-on]
└── Re-injects application on TurboLinks/Hotwire SPA navigation
└── No page reload required - hooks into every route transition

text

---

### Keyboard Shortcut System

| Shortcut | Action |
|---|---|
| `Tab + Space` | Smart submit with countdown |
| `F` | Cursor targeting / image focus mode |
| `X` | Multi-select fail mode toggle |
| `Z` | Zoom image |
| `U` | Undo last QC action |
| `← →` | Navigate / swap items |
| `Enter` | Auto-start QC from homepage |

---

### Data Pipeline
┌────────────────────────────────────────────────────────────────┐
│ COLLECTION LAYER │
│ │
│ getSkuAttributes(row) │
│ → Extracts: brand · color · taxons · auth status · URL │
│ │
│ Output schema: │
│ date | user | sku | brand | color | taxons | │
│ auth | url | status | reason │
└──────────────────────────┬─────────────────────────────────────┘
│
▼
┌────────────────────────────────────────────────────────────────┐
│ STATE LAYER │
│ │
│ failData[] → structured fail record array │
│ passData[] → structured pass record array │
│ stagedFails → Map<sku, [{url, reason, status}]> │
│ qcVolumeHistory → [{date, day, volume}] (730-day rolling) │
│ 40+ localStorage keys for full session persistence │
└──────────────────────────┬─────────────────────────────────────┘
│
▼
┌────────────────────────────────────────────────────────────────┐
│ EXPORT / SYNC LAYER │
│ │
│ executeCSVExport() → downloads structured CSV │
│ processMultipleCSVFiles() → bulk CSV import for forecast │
│ CSV Auto-backup → daily unexported data guard │
│ syncWithCloudBrain() → GAS baseline lock at 7AM │
└────────────────────────────────────────────────────────────────┘

**CSV Export Schema:**
date, user_id, sku, brand, color, taxons, auth, image_url, status, reason

---

### ML Forecasting Engine

```javascript
// 7-Day weighted weekday average forecast
get7DayForecastHTML()
  ├── Input:   qcVolumeHistory[] — rolling 730-day dataset
  ├── Method:  Weighted moving average grouped by day-of-week
  │            (recent entries weighted higher than historical)
  ├── Output:  7-day HTML forecast widget with projected volumes
  └── Access:  Admin-only panel

// Data management
exportForecastCSV()          // Export full 730-day history
importForecastCSV(files)     // Bulk import from multiple CSV files
processMultipleCSVFiles()    // Merge & deduplicate import batches
```

The forecasting engine enables QC team leads to anticipate volume surges, pre-allocate
analyst capacity, and set daily pacing targets before the queue opens.

---

### Cloud Synchronization
syncWithCloudBrain()
└── Endpoint: Google Apps Script REST URL
└── Trigger: Daily at 7AM
└── Pattern: First-Writer-Wins lock
└── First analyst to check in locks the baseline volume for all users
└── Prevents data drift in distributed team sessions
└── Subsequent users read the locked value instead of re-fetching

fetchWithCache(url, cacheKey, callback)
└── Enterprise caching engine with 1-hour TTL
└── Fallback handling for offline/degraded connectivity
└── Anti-429 rate limit protection

fetchTotalWorkload()
└── Polls internal API: /api/internal/metrics/queue_status, /api/queue/item_fetch
└── Returns live queue depth for dashboard display

---

### Security & License System
SECURITY ARCHITECTURE (4 Layers)
│
├── LAYER 1 — loader.user.js
│   ├── License validation: expiry date check against license.json
│   ├── User identity selection + admin password gate
│   ├── Strict URL whitelist (admin only)
│   └── Cloud bridge security bouncer (Google Apps Script only)
│
├── LAYER 2 — qc-enterprise.user.js
│   ├── Full-screen force-update overlay (blocks all interaction)
│   ├── Anti-bypass interval: DOM manipulation detection every 1s
│   └── Scroll lock enforcement during update gate
│
├── LAYER 3 — qc-enterprise.txt (80.3 KB)
│   ├── Core application logic stored as obfuscated/encoded payload
│   ├── Fetched at runtime via secure cloud loader
│   └── Never served in plain text — protects IP from reverse-engineering
│
└── LAYER 4 — license.json
    ├── User database: USER-001 to USER-011 (11 licensed analysts)
    ├── Per-user schema: { name, active: bool, expiry: "YYYY-MM-DD" }
    └── Expiry: 2030-12-30 (long-term licensed deployment)

---

## Tech Stack

| Category | Technology | Usage |
|---|---|---|
| **Language** | JavaScript ES6+ (Vanilla) | Entire application - no framework |
| **Runtime** | Tampermonkey / Greasemonkey | Userscript engine / deployment target |
| **Storage** | `localStorage` State Machine | 40+ keys, full session persistence |
| **Cloud Backend** | Google Apps Script | REST endpoint, 7AM baseline sync |
| **APIs** | Internal REST, `GM_xmlhttpRequest` | Workload count, cross-origin requests |
| **Data Formats** | JSON, CSV | License DB, config, export/import pipeline |
| **UI Patterns** | Shadow DOM, Web Animations API | Isolated animation, micro-interactions |
| **DOM Patterns** | MutationObserver, ResizeObserver | SPA hooks, panel auto-save |
| **Architecture** | IIFE, Event Delegation, Observer | Self-contained, dynamic DOM targeting |
| **Security** | Obfuscated payload, license gating | IP protection, access control |
| **Distribution** | Cloud-fetched encoded payload | Runtime delivery, version enforcement |

---

## State Management

All application state is managed through a structured `localStorage` State Machine -
enabling zero-latency reads, full offline capability, and session persistence across
SPA page transitions.

```javascript
// Session State
"qcCount"                  // Current session item count
"qcTotalImages"            // Total workload for the day
"qcWorkloadLockedVolume"   // Cloud-locked 7AM baseline volume

// Data State
"qcFailData"               // JSON array of all fail records
"qcPassData"               // JSON array of all pass records
"qcVolumeHistory"          // 730-day rolling volume dataset (ML input)

// UI State
"qcDarkMode"               // Dark mode preference
"qcPanelPosition"          // Snap panel X/Y coordinates
"qcPanelSize"              // Resizable panel dimensions

// License State
"qcActiveLicense"          // Current authenticated user session

// + 30 additional keys for settings, preferences, and runtime flags
```
---

## Key Design Decisions

### 1. localStorage as a State Machine
Rather than a traditional backend database, all session state, user data, QC history,
and configuration is managed through a structured `localStorage` layer with 40+ named
keys. This enables **zero-latency reads**, full offline capability, and transparent session
persistence across SPA page transitions — all without any server infrastructure.

### 2. Cloud-Local Hybrid Sync (First-Writer-Wins)
The 7AM baseline workload volume is synchronized across all 11 users via Google Apps Script.
The first analyst to check in at 7AM **locks the volume for all others** - preventing data
drift in a distributed concurrent team session. All subsequent users read the locked value
rather than fetching independently.

### 3. Humanized Automation
All automated actions use **randomized delays (80–450ms jitter)** to mimic real human
interaction patterns. This prevents rate-limiting and prevents detection triggers to implements request queuing and rate-limit awareness.

### 4. SPA-Aware Injection
A persistent `MutationObserver` hooks into TurboLinks/Hotwire navigation events to
re-inject the full application on every route transition - no page reload required.
This is critical for maintaining state continuity in a Rails SPA environment.

### 5. Zero-Dependency Architecture
The entire 3,670-line application is written in **vanilla JavaScript with no external
dependencies, no build step, no bundler, and no framework**. This was a deliberate
choice to minimize attack surface, eliminate supply-chain risk, and ensure the script
could be deployed instantly to any analyst without installation friction.

---

## Impact Metrics

| Metric | Result |
|---|---|
| Daily throughput | **1,000+ items / day** (fully automated tracking) |
| Accuracy rate | **98–99%** (enforced by QA gate) |
| Revision rate | **↓ 25%** reduction |
| Team efficiency | **↑ 20%** improvement |
| Client revisions | **↓ 30%** fewer requests |
| Data exports | **Automated daily CSV backup** (zero manual effort) |
| Volume prediction | **7-day ML forecast** (730-day training window) |

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
