import json
import re
from backend.schemas import AnalyzeResponse

def parse_llm_response(raw_text: str) -> AnalyzeResponse:
    """
    Parses the raw LLM output into a safe AnalyzeResponse object.
    Handlers markdown code blocks, partial JSON, and defaults.
    """
    try:
        # 1. Clean Markdown
        clean_text = raw_text.replace("```json", "").replace("```", "").strip()
        
        # 2. Parse JSON
        data = json.loads(clean_text)
        
        # 3. Normalize Confidence
        confidence = float(data.get("confidence", 0.0))
        confidence = max(0.0, min(1.0, confidence)) # Clamp
        
        # 4. Safety Checks
        response_type = data.get("type", "unknown").lower()
        if response_type not in ["movie", "sports", "game", "unknown"]:
            response_type = "unknown"
            
        if confidence < 0.6:
            response_type = "unknown"
            
        return AnalyzeResponse(
            type=response_type,
            title=data.get("title", "Unknown"),
            description=data.get("description", "Could not identify content."),
            people=data.get("people", []),
            watch_on=data.get("watch_on", []),
            confidence=confidence
        )
        
    except Exception as e:
        # Fallback for parsing errors
        # print(f"LLM Parsing Error: {e}") - Removed
        return AnalyzeResponse(
            type="unknown",
            title="Error",
            description="Failed to parse AI response.",
            people=[],
            watch_on=[],
            confidence=0.0
        )
