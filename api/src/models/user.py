from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.models.email_analysis import EmailAnalysis

class User(SQLModel, table=True):
  __tablename__ = "users"
  
  id: int = Field(primary_key=True)
  google_id: str = Field(unique=True, index=True)
  email: str = Field(unique=True, index=True)
  name: str
  picture: str | None = None
  is_active: bool = Field(default=True)
  created_at: datetime = Field(default_factory=datetime.utcnow)
  last_login: datetime | None = None
  
  email_analyses: list["EmailAnalysis"] = Relationship(back_populates="user")
