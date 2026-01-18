from jose import jwt, JWTError
from datetime import datetime, timedelta
from src.config.auth_config import auth_settings

def create_access_token(user_id: int, email: str) -> str:
  expire = datetime.utcnow() + timedelta(
    minutes=auth_settings.JWT_EXPIRATION_MINUTES
  )
  
  payload = {
    "sub": str(user_id),
    "email": email,
    "exp": expire
  }
  
  return jwt.encode(
    payload,
    auth_settings.JWT_SECRET_KEY,
    algorithm=auth_settings.JWT_ALGORITHM
  )

def verify_token(token: str) -> dict | None:
  try:
    payload = jwt.decode(
      token,
      auth_settings.JWT_SECRET_KEY,
      algorithms=[auth_settings.JWT_ALGORITHM]
    )
    return payload
  except JWTError:
    return None
