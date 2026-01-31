from pydantic import BaseModel, Field, field_validator
from typing import List, Optional

class AnalyzeRequest(BaseModel):
    url: str = Field(..., description="The URL of the video to analyze")

    @field_validator('url')
    def validate_url(cls, v):
        allowed_domains = ['youtube.com', 'youtu.be', 'instagram.com', 'x.com', 'twitter.com']
        if not any(domain in v for domain in allowed_domains):
            raise ValueError('Unsupported platform. Only YouTube, Instagram, and X are supported.')
        return v

class AnalyzeResponse(BaseModel):
    type: str = Field(..., pattern="^(movie|sports|game|unknown)$")
    title: str
    description: str
    people: List[str] = Field(default_factory=list)
    watch_on: List[str] = Field(default_factory=list)
    confidence: float = Field(..., ge=0.0, le=1.0)
