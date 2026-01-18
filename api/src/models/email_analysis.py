from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
from src.models.enums import email_category

class EmailAnalysis(SQLModel, table=True):
  __tablename__ = "email_analysis"
  
  id: Optional[int] = Field(default=None, primary_key=True)
  
  content_preview: str = Field(max_length=500)
  content_hash: str = Field(index=True, unique=True)
  
  category: email_category
  suggested_response: str
  
  processing_time_ms: float
  created_at: datetime = Field(default_factory=datetime.utcnow)
