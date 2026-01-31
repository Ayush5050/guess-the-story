# 🎬 Guess the Story - AI Scene Analyzer

**Guess the Story** is a modern, AI-powered web application that identifies movies, sports matches, and games from a simple video link. Built with a premium aesthetic and an extensible backend architecture.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-live-success.svg)

## ✨ Key Features

- **🧠 AI-Powered Analysis**: Instantly identifies content using Google Gemini 2.0 Flash (extensible to OpenAI, etc.).
- **🔗 Universal Link Support**: Works with YouTube Shorts, Instagram Reels, and X (Twitter) videos.
- **🎨 Premium UI**: A beautiful, responsive interface built with Next.js and Tailwind CSS.
- **🛡️ Robust Architecture**: 
  - **Provider Pattern**: Easily switch between AI models (Gemini, OpenAI, Claude) via configuration.
  - **Secure**: strict environment variable management and error handling.
  - **Type-Safe**: Full TypeScript frontend and Pydantic-validated backend.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons, TypeScript.
- **Backend**: FastAPI (Python), Google Generative AI SDK.
- **AI Model**: Gemini 2.0 Flash (Default).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.9+
- A Google Cloud API Key (for Gemini)

### 1. Backend Setup
The backend runs on port `8000` and handles the AI analysis.

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt # (Manually install dependencies if txt not present: fastapi uvicorn google-generativeai python-dotenv)
```

**Configuration**:
Create a `.env` file in `backend/`:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
MODEL_NAME=gemini-2.0-flash
LLM_PROVIDER=gemini
```

**Run Server**:
```bash
uvicorn backend.main:app --reload
```

### 2. Frontend Setup
The frontend runs on port `3000`.

```bash
# In the root directory
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start analyzing!

## 🔌 Extensibility (Provider Pattern)

This project uses a clean **Provider Pattern** for LLM integration. To add a new AI provider (e.g., OpenAI):

1.  Create `backend/services/openai_provider.py` implementing the `LLMProvider` interface.
2.  Register it in `backend/services/factory.py`.
3.  Set `LLM_PROVIDER=openai` in your `.env`.

No changes to the main application logic are required!

## 📄 License

MIT License. Free to use and modify.
