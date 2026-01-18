from pydantic_settings import BaseSettings

class AuthSettings(BaseSettings):
  JWT_SECRET_KEY: str
  JWT_ALGORITHM: str = "HS256"
  JWT_EXPIRATION_MINUTES: int = 60 * 24 * 7  # 7 days
  
  GOOGLE_CLIENT_ID: str
  GOOGLE_CLIENT_SECRET: str
  
  class Config:
    env_file = ".env"
    extra = "ignore"  

auth_settings = AuthSettings()
