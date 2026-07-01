# NeoDev

> A modern Social Network built exclusively for Developers to connect, share knowledge, and showcase their profiles.

![NeoDev Preview](https://img.shields.io/badge/Status-Active-success)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)

NeoDev is a full-stack MERN application designed as a hub for developers. It allows developers to create professional portfolios, share technical posts, ask questions, and network with other developers.

## ✨ Features

- **User Authentication:** Secure JWT-based registration and login system.
- **Developer Profiles:** Showcase your skills, current status, company, website, and GitHub repositories.
- **Experience & Education Tracking:** Add and manage your career history.
- **Community Posts:** Create, like, and comment on technical posts.
- **AI Integration (Powered by Gemini):**
  - **AI Bio Generator:** Automatically generate a professional bio based on your skills and status.
  - **AI Post Enhancer:** Enhance your casual posts with professional grammar and relevant hashtags before publishing.
- **Space/Glassmorphism UI:** A sleek, modern user interface with a dynamic galaxy background.

## 🛠️ Tech Stack

- **Frontend:** React, Redux, React-Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **AI Integration:** Google GenAI (`@google/genai`)

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and MongoDB installed on your system. You will also need a Google Gemini API Key for the AI features.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FawazIsrar/NeoDev.git
   cd NeoDev
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

### Configuration

Create a file named `local.json` inside the `config` directory:

```json
{
  "mongoURI": "YOUR_MONGODB_CONNECTION_STRING",
  "jwtSecret": "YOUR_JWT_SECRET_TOKEN",
  "geminiApiKey": "YOUR_GEMINI_API_KEY"
}
```

### Running the App

Run both the React client and Node server concurrently:

```bash
# From the root directory
npm run dev
```

The app will start on `http://localhost:3000`.

## 📝 License

This project is the proprietary property of FawazIsrar.
