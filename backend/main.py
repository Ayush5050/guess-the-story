import warnings
# Suppress Pydantic V2 / Google Deprecation warnings for cleaner logs
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=UserWarning)

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from backend.schemas import AnalyzeRequest, AnalyzeResponse
from backend.services.metadata import extract_metadata
from backend.services.factory import get_llm_provider
from backend.services.base import LLMProvider
from backend.config import settings

app = FastAPI(title="Movie/Sports Guesser API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for V1 dev convenience, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Scene Guesser API is running!"}

@app.get("/health")
def health_check():
    return {"status": "ok", "model": settings.MODEL_NAME, "provider": settings.LLM_PROVIDER}

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_video(
    request: AnalyzeRequest,
    provider: LLMProvider = Depends(get_llm_provider)
):
    # 1. Validate & Extract Metadata (Light)
    metadata = await extract_metadata(request.url)
    
    # 2. Call LLM Provider
    response = await provider.analyze(request.url, metadata)
    
    return response
