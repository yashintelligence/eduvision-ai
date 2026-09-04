from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import PROJECT_NAME, API_V1_STR, CORS_ORIGINS
from app.api.routes import router as api_router
from app.services.storage import init_db

app = FastAPI(
    title=PROJECT_NAME,
    description="EduVision AI - Production FastAPI Backend for Student Performance Prediction",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for seamless development & deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(api_router, prefix=API_V1_STR)

@app.get("/")
def root():
    return {
        "message": "EduVision AI API is running.",
        "docs": "/docs",
        "health": f"{API_V1_STR}/health"
    }
