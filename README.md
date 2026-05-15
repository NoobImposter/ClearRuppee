# ClearRupee 💳

**ClearRupee** is an AI-powered financial intelligence dashboard specifically designed for the Pakistani market. It helps users understand their financial life by converting messy bank statements (PDF/CSV) into beautiful, interactive visualizations, smart insights, and actionable reports.

Whether you're a student, freelancer, or salaried professional, ClearRupee makes personal finance management simple, intelligent, and visually appealing.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Screenshots](#️-screenshots)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Configuration](#-api-configuration)
- [Academic Context](#-academic-context)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📊 Overview

ClearRupee solves a major pain point in Pakistan — dealing with confusing bank statements from HBL, UBL, Meezan, JazzCash, EasyPaisa, etc. The app automatically parses these statements, categorizes transactions intelligently, detects anomalies, and presents everything in a premium, easy-to-understand dashboard.

---

## 🖼️ Screenshots







<p align="center">
<img width="1920" height="992" alt="Screenshot from 2026-05-15 10-58-15" src="https://github.com/user-attachments/assets/c1171f3b-8e3d-44fa-9862-53224f39cad7" />
  <br>
  <em>Main Financial Dashboard</em>
</p>

<p align="center">
<img width="1920" height="992" alt="Screenshot from 2026-05-15 10-58-23" src="https://github.com/user-attachments/assets/f1018ffc-2691-4da9-8ff5-cceeccc2d408" />

<img width="1920" height="992" alt="Screenshot from 2026-05-15 10-58-27" src="https://github.com/user-attachments/assets/5cbb68c2-e27c-4193-baf9-16ffd3fbafff" />

  <br>
  <em>Spending Analysis & Asset Distribution Views</em>
</p>

> *Replace placeholder images with actual screenshots from the `screenshots/` folder once uploaded.*

---

## ✨ Key Features

- **Smart Bank Statement Parser** — Upload PDF or CSV statements from any Pakistani bank and get instant structured data.
- **Interactive Visualizations** — Beautiful charts for spending trends, monthly breakdowns, and income vs expense.
- **AI-Powered Insights** — Automatically detects hidden charges, recurring payments, unusual transactions, and spending leaks.
- **Automatic Categorization** — Smart classification of transactions (Food, Transport, Bills, Shopping, etc.) with manual override option.
- **Asset & Liability Tracking** — Monitor your net worth with visual asset distribution.
- **Premium Minimalist UI** — Clean, modern interface using Deep Blue and Soft Teal professional color scheme.
- **Responsive Design** — Works perfectly on desktop, tablet, and mobile.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| State Management | Zustand |
| Styling | Tailwind CSS |
| Charts | Recharts / Chart.js |
| Backend | Cloudflare Workers (Serverless) |
| Database | Cloudflare D1 + WatermelonDB |
| PDF Parsing | pdf.js / pdf-parse |
| AI Insights | Custom rule-based + OpenAI API |
| Deployment | Cloudflare Pages + Workers |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NoobImposter/ClearRupee.git
cd ClearRupee
```

### 2. Install Dependencies

```bash
npm install
```

### 3. API Configuration (Important)

- Create or open the file: `src/components/apis/constants.ts`
- Paste the API keys and constants provided in your Google Classroom Private Comment.
- Ensure `constants.ts` is added to `.gitignore` to protect your keys.

> ⚠️ **Security Note:** Never push your API keys to GitHub.

### 4. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173` (or the port shown in terminal) to view the app.

---

## 📂 Project Structure

```
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── apis/               # API calls and constants.ts
│   │   ├── ui/                 # Reusable UI components (buttons, cards, charts)
│   │   └── layout/             # Navbar, Sidebar, Dashboard layout
│   ├── store/                  # Zustand global state management
│   ├── hooks/                  # Custom React hooks
│   ├── views/                  # Main pages (Dashboard, Reports, Upload, etc.)
│   ├── lib/                    # Utility functions and parsers
│   └── assets/                 # Images and icons
├── screenshots/                # Application screenshots for README
├── workers/                    # Cloudflare Workers backend code
├── .gitignore
├── package.json
└── vite.config.ts
```

---

## 🎓 Academic Context

| Field | Details |
|---|---|
| **Project Title** | ClearRupee – AI-Powered Financial Intelligence Dashboard |
| **Course** | Web Theory (CS3010) |
| **Submitted To** | Shafiq Ahmed |
| **Semester** | [6th ] |

This project demonstrates modern full-stack web development, data visualization, serverless architecture, and the application of AI in solving real-world financial problems in Pakistan.

---

## 🗺️ Future Roadmap

- [ ] Multi-language support (English + Urdu)
- [ ] Mobile App (React Native)
- [ ] Bank API integration (Open Banking)
- [ ] Export reports as PDF
- [ ] Budget planning and goal setting
- [ ] Dark/Light mode toggle
- [ ] Expense splitting and group tracking

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is developed for academic purposes. All rights reserved.
