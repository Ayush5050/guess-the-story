import google.generativeai as genai
from backend.config import settings
from backend.services.base import LLMProvider
from backend.services.safety import parse_llm_response
from backend.schemas import AnalyzeResponse

class GeminiProvider(LLMProvider):
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel(settings.MODEL_NAME)

    def _build_prompt(self, metadata: dict, url: str) -> str:
        return f"""
You are an expert in movies, sports, and games.

Based on the metadata below, identify what the video is from.

Metadata:
Platform: {metadata.get('platform')}
Title: {metadata.get('title')}
Description: {metadata.get('description')}
URL: {url}

Rules:
- Guess if needed, but reduce confidence
- If very unsure, set type to "unknown"
- Confidence must be between 0 and 1
- Respond ONLY in valid JSON
- Do NOT add explanations

JSON schema:
{{
  "type": "movie | sports | game | unknown",
  "title": "string",
  "description": "string",
  "people": ["string"],
  "watch_on": ["string"],
  "confidence": number
}}
"""

    async def analyze(self, url: str, metadata: dict) -> AnalyzeResponse:
        try:
            prompt = self._build_prompt(metadata, url)
            
            # Using async generation
            response = await self.model.generate_content_async(prompt)
            
            return parse_llm_response(response.text)
            
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "quota" in error_str.lower():
                from fastapi import HTTPException
                raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
                
            # print(f"Gemini API Error: {e}")
            return AnalyzeResponse(
                type="unknown",
                title="Analysis Failed",
                description="Could not connect to AI service.",
                people=[],
                watch_on=[],
                confidence=0.0
            )
