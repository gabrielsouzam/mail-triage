from sqlmodel import Session, select, func
from src.models.email_analysis import EmailAnalysis
from datetime import datetime
from typing import Optional
import hashlib

def get_email_analysis_by_hash(session: Session, content_hash: str) -> Optional[EmailAnalysis]:
  statement = select(EmailAnalysis).where(EmailAnalysis.content_hash == content_hash)
  return session.exec(statement).first()

def create_email_analysis(
  session: Session,
  content: str,
  category: str,
  response: str,
  processing_time_ms: float,
  user_id: Optional[int] = None
) -> EmailAnalysis:
  content_hash = hashlib.sha256(content.encode()).hexdigest()
  
  analysis = EmailAnalysis(
    content_preview=content[:500],
    content_hash=content_hash,
    category=category,
    suggested_response=response,
    processing_time_ms=processing_time_ms,
    user_id=user_id
  )
  
  session.add(analysis)
  session.commit()
  session.refresh(analysis)
  return analysis

def get_stats(session: Session) -> dict:
  total = session.exec(select(func.count(EmailAnalysis.id))).one()
  
  productive_count = session.exec(
    select(func.count(EmailAnalysis.id)).where(EmailAnalysis.category == "productive")
  ).one()
  
  avg_time = session.exec(select(func.avg(EmailAnalysis.processing_time_ms))).one()
  
  today = datetime.utcnow().date()
  today_count = session.exec(
    select(func.count(EmailAnalysis.id)).where(
      func.date(EmailAnalysis.created_at) == today
    )
  ).one()
  
  return {
    "total_analyses": total or 0,
    "productive_count": productive_count or 0,
    "unproductive_count": (total or 0) - (productive_count or 0),
    "productive_rate": round((productive_count / total * 100) if total > 0 else 0, 1),
    "avg_processing_time_ms": round(avg_time, 2) if avg_time else 0,
    "today_count": today_count or 0
  }

def get_recent_analyses(session: Session, limit: int = 10) -> list[dict]:
  statement = select(EmailAnalysis).order_by(EmailAnalysis.created_at.desc()).limit(limit)
  analyses = session.exec(statement).all()
  
  return [
    {
      "id": a.id,
      "preview": a.content_preview[:100] + "..." if len(a.content_preview) > 100 else a.content_preview,
      "category": a.category,
      "suggested_response": a.suggested_response,
      "created_at": a.created_at.isoformat().replace('+00:00', 'Z') if a.created_at.tzinfo else a.created_at.isoformat() + 'Z'
    }
    for a in analyses
  ]
