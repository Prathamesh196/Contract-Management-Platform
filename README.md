# 📄 Contract Management Platform (Frontend)

A frontend-only **Contract Management Platform** built with **React and TypeScript** that models a real-world contract workflow. The application focuses on clean architecture, strong state management, and strict lifecycle control, with all data persisted locally.

---

## 🚀 Live Demo
👉 https://your-project-name.vercel.app

---

## 🧩 Project Overview

This application simulates how contracts are created, managed, and tracked in an organization.  
It allows users to define reusable contract templates (**Blueprints**), generate real contract instances, manage them through a controlled lifecycle, and monitor everything from a centralized dashboard.

There is **no backend** involved. The entire system runs on the frontend using **localStorage**.

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
- Contains only field definitions (type, label, position)
- Reusable for creating multiple contracts
- Does NOT store user-entered values

---

### 2️⃣ Contract
- Created from a selected blueprint
- Copies all fields from the blueprint
- Stores user-entered values
- Follows a strict lifecycle

---

## 🔐 Contract Lifecycle

| Status    | Description |
|----------|------------|
| CREATED  | Contract created and editable |
| APPROVED | Internally approved |
| SENT     | Sent to recipient |
| SIGNED   | Signed by recipient |
| LOCKED   | Finalized and read-only |
| REVOKED  | Cancelled and permanently closed |

### Allowed Transitions
CREATED → APPROVED → SENT → SIGNED → LOCKED
CREATED → REVOKED
SENT → REVOKED

yaml
Copy code

- Lifecycle steps cannot be skipped
- LOCKED and REVOKED are terminal states
- All rules are enforced at the UI level

---

## 📊 Dashboard Features
- Centralized view of all contracts
- Displays:
  - Contract Name
  - Blueprint Name
  - Status
  - Created Date
- Filter contracts by status:
  - Active
  - Pending
  - Signed
- Quick navigation to contract details

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
- Create and store blueprints
- Generate contracts from blueprints
- Update contract data
- Enforce lifecycle transitions
- Persist all state to localStorage

---

## 💾 Persistence
- All data is stored using **localStorage**
- Refreshing the browser restores the complete application state
- No backend or database is required

---

## 🧪 Manual Testing Checklist
- Create a blueprint
- Create a contract from blueprint
- Verify contract appears in dashboard
- Move contract through lifecycle states
- Lock or revoke contract
- Refresh page and verify persistence

---

## ⚠️ Assumptions & Limitations
- No authentication or user roles
- No backend or server-side logic
- No PDF generation or external integrations
- Designed for demonstration and evaluation purposes

---

## ✅ Conclusion

This project demonstrates how a **real-world contract management system** can be effectively modeled using only frontend technologies. By separating templates from contract instances, enforcing strict lifecycle rules, and maintaining a clean, scalable architecture, the application highlights strong **product thinking, state management, and UI-driven business logic**. It serves as a solid foundation for extending into a full-stack or enterprise-grade solution.

---

## 🧑‍💻 Author
Your Name  
Frontend Developer
