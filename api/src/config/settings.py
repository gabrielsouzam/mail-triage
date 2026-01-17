from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    GOOGLE_API_KEY: str
    GOOGLE_API_MODEL: str
    
    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"  # Allow extra env variables
    )

settings = Settings()
