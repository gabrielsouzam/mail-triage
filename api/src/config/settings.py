from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from sqlmodel import create_engine

class Settings(BaseSettings):
    GOOGLE_API_KEY: str
    GOOGLE_API_MODEL: str
    DATABASE_URL: str
    
    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )

settings = Settings()

engine = create_engine(
    settings.DATABASE_URL,
    pool_recycle=3600,
    pool_size=10,
    max_overflow=5,
    echo=False,
    pool_pre_ping=True,
)
