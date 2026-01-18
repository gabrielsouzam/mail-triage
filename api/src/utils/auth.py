from fastapi import Depends, HTTPException, status, Request
from sqlmodel import Session, select
from src.models.user import User
from src.services.jwt_service import verify_token
from src.utils.database import get_db

async def get_current_user(
  request: Request,
  session: Session = Depends(get_db)
) -> User:
  token = request.cookies.get("access_token")
  
  if not token:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Not authenticated"
    )
  
  payload = verify_token(token)
  if not payload:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid authentication credentials"
    )
  
  user_id = int(payload.get("sub"))
  statement = select(User).where(User.id == user_id)
  user = session.exec(statement).first()
  
  if not user or not user.is_active:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="User not found or inactive"
    )
  
  return user
