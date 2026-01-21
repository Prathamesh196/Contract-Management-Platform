📄 Contract Management Platform (Frontend)

A frontend-only Contract Management Platform built using React and TypeScript that models a real-world contract workflow. The system enables users to design reusable contract templates (Blueprints), generate contracts from those templates, manage contracts through a strict lifecycle, and monitor everything from a centralized dashboard.

🚀 Live Demo

👉 Add your Vercel deployment link here

https://your-project-name.vercel.app

🧩 Project Overview

This application simulates how contracts are handled in real organizations:

Blueprints define the structure of a contract

Contracts are created from blueprints

Each contract follows a strict lifecycle

A dashboard provides complete visibility

The focus of this project is on:

Product thinking

UI-driven business logic

State management

Clean and scalable frontend architecture

🏗️ System Workflow
High-Level Flow
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

🧠 Core Concepts
1️⃣ Blueprint (Contract Template)

A Blueprint is a reusable template that defines:

Field types (Text, Date, Checkbox, Signature)

Field labels

Field positions on the contract

Blueprints do not store user-entered values.

2️⃣ Contract

A Contract is a real instance created from a blueprint.
It:

Copies all fields from the blueprint

Stores user-entered values

Follows a strict lifecycle

3️⃣ Contract Lifecycle
State	Description
CREATED	Contract created, editable
APPROVED	Internally approved
SENT	Sent to recipient
SIGNED	Signed by recipient
LOCKED	Finalized, read-only
REVOKED	Cancelled, terminal state
Allowed Transitions
CREATED  → APPROVED → SENT → SIGNED → LOCKED
CREATED  → REVOKED
SENT     → REVOKED


No steps can be skipped

LOCKED and REVOKED are terminal states

Lifecycle rules are enforced at the UI level

📊 Dashboard

The dashboard provides a centralized view of all contracts.

Features:

Table view of all contracts

Displays:

Contract Name

Blueprint Name

Status

Created Date

Filter contracts by status:

Active

Pending

Signed

Quick access to view and manage contracts

🛠️ Tech Stack
Technology	Purpose
React (Vite)	UI framework
TypeScript	Type safety
React Router	Client-side routing
Context API / Zustand	Global state management
localStorage	Data persistence
CSS / Tailwind	Styling
📁 Folder Structure
src/
 ├── components/        # Reusable UI components
 ├── pages/             # Page-level views
 ├── store/             # Global state management
 ├── models/            # Type definitions
 ├── utils/             # Lifecycle & storage utilities
 ├── App.tsx            # Routing configuration
 ├── main.tsx           # App entry point
 └── index.css          # Global styles

🗂️ State Management

A single global store manages:

All blueprints

All contracts

Store Responsibilities:

Create and save blueprints

Create contracts from blueprints

Update contract data

Control lifecycle transitions

Persist all data to localStorage

💾 Persistence

All data is stored in localStorage

Refreshing or reopening the browser restores the full application state

No backend or API is required

🧪 Manual Testing Checklist

✔ Create a blueprint
✔ Create a contract from blueprint
✔ View contract in dashboard
✔ Move contract through lifecycle
✔ Lock or revoke contract
✔ Refresh page → data persists

If all pass, the application is working correctly.

⚠️ Assumptions & Limitations

No authentication or user roles

No backend or database

No PDF export

Designed for demonstration and evaluation purposes

📌 Why React (Not Next.js)?

React was chosen to keep the architecture:

Lightweight

Focused on UI-driven state management

Free from unnecessary SSR or backend complexity
