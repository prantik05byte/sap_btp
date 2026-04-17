# 🏭 SmartProcure 360
### SAP BTP Capstone Project — NovaTech Industries Pvt. Ltd.

> An automated **Purchase Order Management & Real-Time Budget Monitoring System** built on **SAP Business Technology Platform (BTP)**, integrating **FI · MM · SD** functional areas.

---

![SAP BTP](https://img.shields.io/badge/SAP-BTP-0854a0?style=for-the-badge&logo=sap&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Prototype-e34f26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_JS-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Fiori_Style-1572b6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-Academic-green?style=for-the-badge)

---

## 📌 Problem Statement

**NovaTech Industries Pvt. Ltd.**, a mid-size manufacturing company with plants in Kolkata and Mumbai, faced critical procurement inefficiencies:

| # | Problem | Impact |
|---|---------|--------|
| 1 | Manual PO approval via email/paper | 3–11 business day delays per PO |
| 2 | No real-time FI budget visibility | 23% average budget overrun per quarter |
| 3 | Disconnected FI ↔ MM systems | 40+ man-hours/month on manual reconciliation |
| 4 | No procurement audit trail | Compliance risk, failed internal audits |
| 5 | SD billing not linked to MM costs | Inaccurate profitability reporting |

**SmartProcure 360** solves this with a cloud-native SAP BTP application that automates the entire procure-to-pay lifecycle.

---

## 🚀 Live Demo

> **Open `index.html` directly in any browser — no server required.**

```bash
git https://github.com/prantik05byte/sap_btp
cd smartprocure360
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

---

## 🏗️ BTP Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  SAP Build Apps │────▶│   SAP CAP        │────▶│  SAP HANA Cloud │
│  (Fiori UI)     │     │  (Node.js/OData) │     │  (Database)     │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                           │
                        ┌──────────────────┐     ┌────────▼────────┐
                        │  SAP Integration │◀────│  BTP Workflow   │
                        │  Suite (iFlow)   │     │  Service        │
                        └────────┬─────────┘     └─────────────────┘
                                 │
                        ┌────────▼─────────┐
                        │  SAP S/4HANA     │
                        │  (Backend ERP)   │
                        └──────────────────┘
```

| Layer | Component | Purpose |
|-------|-----------|---------|
| UI | SAP Build Apps (Fiori) | PO creation, dashboard, approval screens |
| Backend | SAP CAP (Node.js / OData v4) | Business logic, validation, REST services |
| Database | SAP HANA Cloud | POs, budgets, vendor & material master data |
| Workflow | BTP Workflow Service | Multi-level approval routing & escalation |
| Integration | SAP Integration Suite | S/4HANA connectivity, vendor email alerts |
| Auth | SAP XSUAA / BTP IAM | Role-based access control (JWT tokens) |

---

## 📂 Project Structure

```
smartprocure360/
│
├── index.html              ← Main application entry point
│
├── css/
│   └── style.css           ← Fiori-inspired stylesheet
│
├── js/
│   └── app.js              ← Application logic (PO, approvals, workflow)
│
└── README.md               ← This file
```

---

## ✨ Features

### 📊 Executive Dashboard
- Real-time KPIs: total POs, budget utilization %, pending approvals, avg. approval time
- Department-wise budget bar charts (FI / MM / SD)
- Live activity feed of all recent transactions
- BTP architecture diagram

### 📋 Purchase Order Management (MM Module)
- Create POs with vendor, material, quantity, unit price, plant & GL account
- Full PO table with status tracking (Pending / Approved / Rejected)
- Linked to cost center & GL account in real time

### 💰 Budget Monitor (FI Module)
- Cost center tracking: CC-1001 (FI), CC-2001 (MM), CC-3001 (SD)
- GL account breakdown per department
- Visual progress bars with color-coded alerts (>80% = warning, >95% = blocked)

### ✅ Approval Workflow (BTP Workflow Service)
- Multi-step approval: System Validation → Manager → Finance Controller → Release
- Urgency-based priority (High / Medium / Low)
- One-click Approve / Reject with instant status update
- Audit trail maintained for every decision

### 🏢 Company Setup
- Full FI / MM / SD organizational structure of NovaTech Industries
- All SAP configuration parameters documented inline

---

## 🏢 Company Master Data — NovaTech Industries Pvt. Ltd.

| Parameter | Value |
|-----------|-------|
| Client | 100 |
| Company Code | NTPL |
| Chart of Accounts | CAIN |
| Controlling Area | NTCA |
| Fiscal Year Variant | V3 (April – March) |
| Plant 1 | NT01 — Kolkata HQ |
| Plant 2 | NT02 — Mumbai Branch |
| Purchase Organization | PO01 |
| Sales Organization | SO01 |
| Distribution Channel | DC01 |
| Division | DV01 (Electronics & Machinery) |
| Currency | INR |

### FI Configuration
- GL Account Range: **4001–4099** (FI), **5001–5099** (MM), **6001–6099** (SD)
- Cost Centers: CC-1001 to CC-3005
- Posting Period Variant: PPV1

### MM Configuration
- Storage Locations: SL01 (Raw Materials), SL02 (Finished Goods)
- Material Types: ROH (Raw), HALB (Semi-finished), FERT (Finished)
- Movement Types: 101 (GRN), 122 (Return to Vendor), 261 (Goods Issue)
- Valuation Classes: 3000, 7920

### SD Configuration
- Sales Area: SO01 / DC01 / DV01
- Shipping Point: SP01 (Kolkata)
- Pricing Procedure: RVAA01
- Output Types: BA00 (Order Confirmation), RD00 (Invoice)

---

## 🔄 Workflow Steps — Procure to Pay

```
[1] PO Created          → Requester fills form in Fiori app
        ↓
[2] System Validation   → CAP checks budget availability in HANA Cloud
        ↓
[3] Manager Approval    → Auto-routed based on PO amount threshold
        ↓
[4] Finance Check (FI)  → Finance Controller verifies cost center budget
        ↓
[5] PO Released         → Vendor notified via SAP Integration Suite email
        ↓
[6] GRN & Invoice       → Three-way match: PO ↔ GRN ↔ Invoice → FI posting
```

---

## 📈 Business Value Delivered

| Metric | Before (Manual) | After (SmartProcure 360) | Improvement |
|--------|----------------|--------------------------|-------------|
| Avg. Approval Time | 11 business days | 4.2 hours | **▼ 61%** |
| Budget Overruns | 23% per quarter | Real-time blocking | **▼ ~0%** |
| Manual Reconciliation | 40+ hrs/month | Automated FI posting | **▼ 100%** |
| Audit Compliance | ❌ No trail | ✅ Full log | **Complete** |

---

## 🛠️ Tech Stack (Production BTP Design)

| Technology | Version / Type | Role |
|------------|----------------|------|
| SAP Build Apps | Latest | Fiori UI, no-code frontend |
| SAP CAP | Node.js / OData v4 | Backend business logic |
| SAP HANA Cloud | Managed SQL | Primary database |
| BTP Workflow Management | SaaS | Approval orchestration |
| SAP Integration Suite | Cloud Foundry | System-to-system integration |
| SAP XSUAA | BTP IAM | Authentication & authorization |
| HTML5 + CSS3 + JS | Vanilla | This interactive prototype |

---

## 📜 Certifications This Project Supports

| Certification | Code | Provider |
|--------------|------|----------|
| SAP BTP Developer Associate | C_BTP_2409 | SAP Global Certification |
| SAP Build Apps Associate | Free Badge | SAP Learning Hub |
| SAP CAP Fundamentals | OpenSAP | SAP (Free Course) |
| SAP Integration Suite Basics | OpenSAP | SAP (Free Course) |
| SAP S/4HANA MM Associate | C_TS422_2023 | SAP Global Certification |

---

## 🔮 Future Improvements

- [ ] **Live S/4HANA Integration** via BTP Connectivity Service & OData APIs
- [ ] **AI Spend Forecasting** using SAP AI Core — predict budget overruns 30 days ahead
- [ ] **Vendor Self-Service Portal** — PO acknowledgment, delivery updates, invoice upload
- [ ] **Mobile Approvals** via SAP Mobile Services with push notifications
- [ ] **SAP Analytics Cloud** dashboards for boardroom-level spend visibility
- [ ] **IoT-Triggered GRN** — automatic goods receipt via RFID sensors + BTP Edge Services

---

## 👤 Author

**[PRANTIK PAN]**  
SAP BTP Developer Program — Capstone Submission  
Batch/Program: [B.Tech.]  
Roll Number: [2305393]  

---

## 📄 License

This project is submitted for academic purposes as part of the SAP BTP Developer Capstone Program. All company data, vendor details, and financial figures are entirely fictitious and created solely for demonstration.

---

<div align="center">
  <sub>Built with ❤️ on SAP Business Technology Platform</sub>
</div>

