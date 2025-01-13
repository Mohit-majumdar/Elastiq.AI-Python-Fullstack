import cohere
from decouple import config

co = cohere.Client(config("COHERE_API_KEY"))


def review_sentiment(review_text):
    response = co.classify(
        model="large",
        inputs=[review_text],
        examples=[
            cohere.ClassifyExample(
                text="I absolutely loved this movie, it was fantastic!",
                label="Positive",
            ),
            cohere.ClassifyExample(
                text="The plot was dull and boring, I didn't enjoy it at all.",
                label="Negative",
            ),
            cohere.ClassifyExample(
                text="The movie was okay, but nothing special.", label="Neutral"
            ),
            cohere.ClassifyExample(
                text="Great acting and direction, but the pacing was off.",
                label="Positive",
            ),
            cohere.ClassifyExample(
                text="I hated the ending, it ruined the whole experience.",
                label="Negative",
            ),
            cohere.ClassifyExample(
                text="It was just average, nothing memorable.", label="Neutral"
            ),
        ],
    )
    classification = response.classifications[0]
    confidence = round(classification.confidence, 2)

    sentiment = classification.prediction
    return sentiment, confidence
