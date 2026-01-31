from abc import ABC, abstractmethod
from backend.schemas import AnalyzeResponse

class LLMProvider(ABC):
    @abstractmethod
    async def analyze(self, url: str, metadata: dict) -> AnalyzeResponse:
        """
        Analyze the video URL using the provided metadata.
        Must return a safe AnalyzeResponse.
        """
        pass
