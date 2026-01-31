from urllib.parse import urlparse
import re

async def extract_metadata(url: str) -> dict:
    """
    Extracts 'light' metadata from the URL without downloading the video.
    Returns a dictionary for the LLM context.
    """
    parsed = urlparse(url)
    domain = parsed.netloc.lower()
    
    platform = "Unknown"
    video_id = "Unknown"
    
    # Platform Identification
    if "youtube.com" in domain or "youtu.be" in domain:
        platform = "YouTube"
        # Extract ID (simple regex for shorts/watch)
        if "shorts" in url:
            match = re.search(r"shorts/([a-zA-Z0-9_-]+)", url)
            if match: video_id = match.group(1)
        elif "v=" in url:
            match = re.search(r"v=([a-zA-Z0-9_-]+)", url)
            if match: video_id = match.group(1)
            
    elif "instagram.com" in domain:
        platform = "Instagram"
        if "reel" in url:
            match = re.search(r"reel/([a-zA-Z0-9_-]+)", url)
            if match: video_id = match.group(1)
            
    elif "x.com" in domain or "twitter.com" in domain:
        platform = "X (Twitter)"
        match = re.search(r"status/(\d+)", url)
        if match: video_id = match.group(1)

    # In V1, we do not scrape Title/Description to stay fast and avoiding blocking.
    # We rely on the LLM to identify purely based on the URL structure or if the user sends more data later.
    # *Correction*: The Spec says "public title (best effort)". 
    # Without a scraper/API key for each platform, this is hard. 
    # We'll pass "Unknown" for now to keep it deterministic as per spec "Only attempt if available".
    
    return {
        "platform": platform,
        "video_id": video_id,
        "title": "Unknown (V1 Light Extraction)", 
        "description": "None"
    }
