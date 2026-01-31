from functools import lru_cache
from backend.config import settings
from backend.services.base import LLMProvider
from backend.services.gemini import GeminiProvider

@lru_cache()
def get_llm_provider() -> LLMProvider:
    """
    Factory function to return the configured LLM provider.
    Currently defaults to Gemini, but extensible for OpenAI/Claude.
    """
    provider_type = settings.LLM_PROVIDER.lower()
    
    if provider_type == "gemini":
        return GeminiProvider()
    
    # Future extensibility:
    # elif provider_type == "openai":
    #     return OpenAIProvider()
    
    # Fallback default
    return GeminiProvider()
