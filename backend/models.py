from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class ReviewBase(SQLModel):
    text: str = Field(index=True)
    sentiment: str = Field(index=True)
    moviename: str = Field(index=True)
    confidence: float


class Review(ReviewBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default=datetime.utcnow())
