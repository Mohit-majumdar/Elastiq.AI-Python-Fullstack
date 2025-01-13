from fastapi import FastAPI, HTTPException
from models import Review
from schema import ReviewRequest, ReviewResponse
from sentiment_detection import review_sentiment
import uvicorn
from db import sessionDep, create_db_and_tables
from sqlmodel import select
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
create_db_and_tables()


@app.post("/api/analyze", response_model=ReviewResponse)
async def analyze(review: ReviewRequest, session: sessionDep):
    if not review.text.strip():
        raise HTTPException(status_code=400, detail="Review text is empty")
    try:
        review_text = review.text
        sentiment, confidence = review_sentiment(review_text)
        review_db = Review(
            text=review_text,
            moviename=review.moviename,
            sentiment=sentiment,
            confidence=confidence,
        )
        session.add(review_db)
        session.commit()
        session.refresh(review_db)
        return ReviewResponse(
            id=review_db.id,
            text=review_text,
            sentiment=sentiment,
            confidence=confidence,
            moviename=review.moviename,
            create_at=review_db.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        )
    except Exception as e:
        session.rollback()
        print(e)
        raise HTTPException(status_code=500, detail=f"Error processing review: {e}")


@app.get("/api/reviews", response_model=list[ReviewResponse])
async def get_reviews(session: sessionDep):
    reviews = session.exec(select(Review).order_by(Review.created_at.desc())).all()
    return [
        ReviewResponse(
            id=review.id,
            text=review.text,
            sentiment=review.sentiment,
            confidence=review.confidence,
            moviename=review.moviename,
            create_at=review.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        )
        for review in reviews
    ]


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
