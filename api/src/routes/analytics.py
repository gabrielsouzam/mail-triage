from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import Annotated

from src.utils.database import get_db
from src.services.email_analysis_service import get_stats, get_recent_analyses

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/stats")
async def analytics_stats(session: Annotated[Session, Depends(get_db)]):
  return get_stats(session)

@router.get("/recent")
async def analytics_recent(
  session: Annotated[Session, Depends(get_db)],
  limit: int = 10
):
  return get_recent_analyses(session, limit)
