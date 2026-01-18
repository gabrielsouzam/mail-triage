import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes import email, analytics, root, auth

ENV = os.getenv("ENVIRONMENT", "development")



app = FastAPI(
    title="Mail Triage API",
    description="An API that analyzes email productivity with Google's Gemini model.",
    version="1.0.0"
)

if ENV == "production":
    allowed_origins = [
        "https://mail-triage-pi.vercel.app",
    ]
else:
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(email.router)  
app.include_router(analytics.router)
app.include_router(root.router)  
app.include_router(auth.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000)