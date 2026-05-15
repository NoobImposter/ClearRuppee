
# ClearRupee 💳

**ClearRupee** is an AI-powered financial intelligence dashboard designed for the Pakistani market[cite: 1]. It transforms complex bank statements into intuitive visual insights, enabling users to track expenses, manage assets, and detect financial patterns through a clean, premium interface[cite: 1].

---

## 🖼️ Screenshots

<!-- 
INSTRUCTIONS FOR SCREENSHOTS:
1. Upload your image files to a 'screenshots' folder in this repository.
2. Replace the 'src' path below with your file path (e.g., ./screenshots/dashboard.png).
-->

<p align="center">
  <img src="https://via.placeholder.com/800x450?text=Dashboard+Overview" alt="Dashboard Overview" width="800">
  <br>
  <em>Main Financial Dashboard</em>
</p>

<p align="center">
  <img src="https://via.placeholder.com/400x250?text=Spending+Analysis" alt="Spending Analysis" width="400">
  <img src="https://via.placeholder.com/400x250?text=Asset+Distribution" alt="Asset Distribution" width="400">
  <br>
  <em>Spending Analysis & Asset Distribution Views</em>
</p>

---

## ✨ Key Features

* **Bank Statement Visualization:** Automated parsing of statements into interactive charts[cite: 1].
* **AI-Driven Insights:** Detection of hidden bank charges and unusual spending behavior[cite: 1].
* **Minimalist UI:** High-performance dashboard designed with a "Deep Blue & Soft Teal" professional palette[cite: 1].
* **Smart Categorization:** Automatic classification of transactions for effortless budgeting[cite: 1].

## 🛠 Tech Stack

* **Frontend:** React (TypeScript)[cite: 1]
* **State Management:** Zustand[cite: 1]
* **Styling:** Tailwind CSS[cite: 1]
* **Backend:** Cloudflare Workers (Serverless)[cite: 1]
* **Database:** Cloudflare D1 / WatermelonDB[cite: 1]

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone [https://github.com/NoobImposter/ClearRuppee.git](https://github.com/NoobImposter/ClearRuppee.git)
cd ClearRuppee
npm install

```

### 2. API Configuration 🔑

For security, API keys are managed externally.

1. Locate the **Private Comment** in the Google Classroom.


2. Navigate to `src/components/apis/`.


3. Open or create the file `constants.ts`.


4. Paste the provided API constants into this file.



**⚠️ Security Note:** Ensure `constants.ts` is ignored by git to prevent leaking your private API keys.

### 3. Development

```bash
npm run dev

```

---

## 📂 Project Structure

```text
├── src
│   ├── components
│   │   ├── apis        # API services & constants.ts (Paste keys here)
│   │   └── ui          # Reusable dashboard components
│   ├── store           # Zustand global state
│   ├── hooks           # Custom React hooks
│   └── views           # Main application screens
├── screenshots         # Folder for application images
└── workers             # Serverless backend logic

```

---

## 🎓 Academic Context

Developed as part of a **Final  Project For Web Thoery CS3010** focusing on financial intelligence and data visualization.


```

```
