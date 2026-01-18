from google.oauth2 import id_token
from google.auth.transport import requests
from sqlmodel import Session, select
from src.models.user import User
from src.config.auth_config import auth_settings
from datetime import datetime

async def verify_google_token(token: str) -> dict | None:
  try:
    idinfo = id_token.verify_oauth2_token(
      token,
      requests.Request(),
      auth_settings.GOOGLE_CLIENT_ID
    )
    
    return {
      "google_id": idinfo["sub"],
      "email": idinfo["email"],
      "name": idinfo["name"],
      "picture": idinfo.get("picture")
    }
  except ValueError:
    return None

def get_or_create_user(session: Session, google_data: dict) -> User:

  statement = select(User).where(User.google_id == google_data["google_id"])
  user = session.exec(statement).first()
  
  if user:
    user.last_login = datetime.utcnow()
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
  
  user = User(**google_data)
  session.add(user)
  session.commit()
  session.refresh(user)
  return user
