from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session
from src.schemas.auth import GoogleTokenRequest, UserResponse
from src.services.auth_service import verify_google_token, get_or_create_user
from src.services.jwt_service import create_access_token
from src.utils.database import get_db
from src.utils.auth import get_current_user
from src.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/google")
async def google_login(
  request: GoogleTokenRequest,
  session: Session = Depends(get_db)
):
  google_data = await verify_google_token(request.token)
  
  if not google_data:
    raise HTTPException(status_code=401, detail="Invalid Google token")
  
  user = get_or_create_user(session, google_data)
  
  access_token = create_access_token(user.id, user.email)
  
  response = JSONResponse(content={
    "user": {
      "id": user.id,
      "email": user.email,
      "name": user.name,
      "picture": user.picture
    }
  })
  
  response.set_cookie(
    key="access_token",
    value=access_token,
    httponly=True,
    secure=False,
    samesite="lax",
    max_age=60 * 60 * 24 * 7 # 7 days
  )
  
  return response

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
  current_user: User = Depends(get_current_user)
):
  return UserResponse(
    id=current_user.id,
    email=current_user.email,
    name=current_user.name,
    picture=current_user.picture
  )

@router.post("/logout")
async def logout():
  response = JSONResponse(content={"message": "Logged out successfully"})
  response.delete_cookie(key="access_token")
  return response
