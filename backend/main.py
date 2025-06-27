
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from routes import quiz, educator

app = FastAPI(
    title="EduTutor AI Backend",
    description="Personalized Learning with Generative AI & LMS Integration",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(quiz.router, prefix="/api", tags=["quiz"])
app.include_router(educator.router, prefix="/api/educator", tags=["educator"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to EduTutor AI Backend",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "EduTutor AI Backend"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
