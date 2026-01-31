import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    MODEL_NAME: str = os.getenv("MODEL_NAME", "gemini-2.0-flash")
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "gemini")

settings = Settings()

if not settings.GOOGLE_API_KEY:
    print("WARNING: GOOGLE_API_KEY is not set in environment variables.")
