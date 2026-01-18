from pydantic import BaseModel, EmailStr
from typing import Optional

class GoogleTokenRequest(BaseModel):
  token: str

class TokenResponse(BaseModel):
  access_token: str
  token_type: str = "bearer"
  user: "UserResponse"

class UserResponse(BaseModel):
  id: int
  email: EmailStr
  name: str
  picture: Optional[str]
