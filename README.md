# 📦 Bytes Maestros Delivery Scheduler

This project is a delivery scheduling system for an online grocery store built with **TypeScript**, consisting of:

- A **backend API** that calculates valid delivery time slots based on product constraints.
- A **frontend web application** for call center agents to view and select slots.

---

## ✨ Features

- Delivery constraints for:
  - 🏬 In-stock products
  - 🥗 Fresh food (daily-prepared)
  - 🤝 External supplier items
- Delivery slots available:
  - On weekdays only (Mon–Fri)
  - From 08:00 to 22:00 in 1-hour intervals
  - Up to 14 days in advance
- Same-day delivery cutoff times:
  - 12:00 for fresh food
  - 18:00 for in-stock items
- External products require a **3-day lead time** and deliver **Tue–Fri only**
- Green delivery slots flagged (off-peak hours: 13–15 or 20–22)

---

## 🏗️ Project Structure


├── delivery-backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── index.ts
├── delivery-frontend/
│ ├── public/
│ ├── src/
│ └── ...
└── README.md



## ⚙️ Getting Started

### Backend Setup

1. Go to the backend folder:


```bash
cd backend
npm install

# Run the backend server:
npm run dev
Server will be available at http://localhost:5000.
----

Frontend Setup
Open a new terminal and go to the frontend folder:

cd delivery-frontend
Install dependencies:
npm install
# Start the frontend dev server:
npm run dev
The app will open at http://localhost:5173.


--

🧪 Testing the App
Select any combination of products.

Click Get Delivery Slots.

Slots will be displayed, with 🌿 green icons for eco-friendly slots.

📁 Clean Architecture Approach
Logic separated into services and utils

Express controllers handle routes cleanly

Models define strict typing via TypeScript

🚫 Limitations
In-memory product list (no database)

Assumes server/client in same timezone

No persistent storage (for simplicity)

🧠 Notes
Easily extendable to real product DB and auth

Styled for simplicity and usability by agents