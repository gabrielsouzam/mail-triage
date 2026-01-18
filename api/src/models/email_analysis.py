from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from src.models.enums import email_category

if TYPE_CHECKING:
    from src.models.user import User

class EmailAnalysis(SQLModel, table=True):
  __tablename__ = "email_analysis"
  
  id: int = Field(primary_key=True)
  content_preview: str = Field(max_length=500)
  content_hash: str = Field(index=True, unique=True)
  category: email_category
  suggested_response: str
  processing_time_ms: float
  created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
  user_id: int | None = Field(default=None, foreign_key="users.id", index=True)
  
  user: "User" = Relationship(back_populates="email_analyses")
