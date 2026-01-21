# 📄 Contract Management Platform (Frontend)

A frontend-only **Contract Management Platform** built with **React and TypeScript** that simulates a real-world contract workflow. The system focuses on clean architecture, strict lifecycle management, and UI-driven business logic with local persistence.

---

## 🚀 Live Demo
👉 https://your-project-name.vercel.app

---

## 🧩 Project Overview

This application allows users to:
- Create reusable **Blueprints** (contract templates)
- Generate **Contracts** from blueprints
- Manage contracts through a **strict lifecycle**
- View and track all contracts from a centralized **Dashboard**

There is **no backend**. All data is stored using **localStorage**.

---

## 🔄 System Workflow

Create Blueprint
↓
Create Contract from Blueprint
↓
Contract appears in Dashboard
↓
Lifecycle Management
(CREATED → APPROVED → SENT → SIGNED → LOCKED)
↘
REVOKED

yaml
Copy code

---

## 🧠 Core Concepts

### 1️⃣ Blueprint (Contract Template)
- Defines the structure of a contract
- Contains only field definitions (no values)
- Reusable across multiple contracts

### 2️⃣ Contract
- Created from a blueprint
- Stores field values entered by the user
- Follows a strict lifecycle

---

## 🔐 Contract Lifecycle

| Status    | Description |
|----------|------------|
| CREATED  | Contract created and editable |
| APPROVED | Internally approved |
| SENT     | Sent to recipient |
| SIGNED   | Signed by recipient |
| LOCKED   | Finalized, read-only |
| REVOKED  | Cancelled, terminal state |

### Allowed Transitions
CREATED → APPROVED → SENT → SIGNED → LOCKED
CREATED → REVOKED
SENT → REVOKED

yaml
Copy code

- No lifecycle steps can be skipped
- LOCKED and REVOKED are terminal states
- Lifecycle rules are enforced via UI logic

---

## 📊 Dashboard Features
- Table view of all contracts
- Displays:
  - Contract Name
  - Blueprint Name
  - Status
  - Created Date
- Filter contracts by status:
  - Active
  - Pending
  - Signed

---

## 🛠️ Tech Stack

| Technology | Usage |
|----------|------|
| React (Vite) | Frontend framework |
| TypeScript | Type safety |
| React Router | Client-side routing |
| Context API / Zustand | Global state management |
| localStorage | Data persistence |
| CSS / Tailwind | Styling |

---

## 📁 Folder Structure

src/
├── components/ # Reusable UI components
├── pages/ # Page-level views
├── store/ # Global state management
├── models/ # Type definitions
├── utils/ # Lifecycle & storage utilities
├── App.tsx # Routing setup
├── main.tsx # Entry point
└── index.css # Global styles

yaml
Copy code

---

## 🗂️ State Management
A single global store manages:
- All blueprints
- All contracts

Responsibilities:
- Add blueprints
- Create contracts from blueprints
- Update contract data
- Control lifecycle transitions
- Persist state to localStorage

---

## 💾 Persistence
- All data is stored in **localStorage**
- Page refresh restores full application state
- No backend or API required

---

## 🧪 Manual Testing Checklist
- Create a blueprint
- Create a contract from blueprint
- View contract in dashboard
- Move contract through lifecycle
- Lock or revoke contract
- Refresh page and verify persistence

---

## ⚠️ Assumptions & Limitations
- No authentication or user roles
- No backend or database
- No PDF generation
- Built for demonstration and evaluation purposes

---

---

## 🧑‍💻 Author
Prathamesh Gawali
Frontend Developer






