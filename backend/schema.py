from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ReviewRequest(BaseModel):
    text: str
    moviename: str


class ReviewResponse(BaseModel):
    id: Optional[int]
    text: str
    sentiment: str
    confidence: float
    moviename: str
    create_at: datetime
