from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from http import HTTPStatus
from sqlmodel import Session
from typing import Annotated
import time
import hashlib

from src.schemas.email import EmailRequest, EmailResponse
from src.services.ai_service import AIService
from src.utils.get_file_content import get_file_content_util
from src.utils.database import get_db
from src.services.email_analysis_service import (
  get_email_analysis_by_hash,
  create_email_analysis
)

router = APIRouter(prefix="/email", tags=["Email"])

def get_ai_service() -> AIService:
  return AIService()

@router.post("/analysis")
async def get_email_analysis(
  request: EmailRequest,
  ai_service: Annotated[AIService, Depends(get_ai_service)],
  session: Annotated[Session, Depends(get_db)]
) -> EmailResponse:
  try:
    start_time = time.time()
    
    content_hash = hashlib.sha256(request.content.encode()).hexdigest()
    
    existing = get_email_analysis_by_hash(session, content_hash)
    if existing:
      return EmailResponse(
        category=existing.category,
        response=existing.suggested_response
      )
    
    analysis = ai_service.get_email_analysis(request.content)
    
    processing_time = (time.time() - start_time) * 1000
    
    create_email_analysis(
      session=session,
      content=request.content,
      category=analysis["category"],
      response=analysis["response"],
      processing_time_ms=processing_time
    )
    
    return EmailResponse(
      category=analysis["category"],
      response=analysis["response"]
    )
  
  except Exception as e:
    raise HTTPException(
      status_code=HTTPStatus.BAD_REQUEST, 
      detail=f"Error get email analysis {e}"
    )
    
@router.post("/analysis/file")
async def get_email_analysis_from_file(
  ai_service: Annotated[AIService, Depends(get_ai_service)],
  session: Annotated[Session, Depends(get_db)],
  file: UploadFile = File(...)
)-> EmailResponse:
  try:
    start_time = time.time()
    text = await get_file_content_util(file)
    
    content_hash = hashlib.sha256(text.encode()).hexdigest()
    
    existing = get_email_analysis_by_hash(session, content_hash)
    if existing:
      return EmailResponse(
        category=existing.category,
        response=existing.suggested_response
      )
  
    analysis = ai_service.get_email_analysis(text)
    
    processing_time = (time.time() - start_time) * 1000
    
    create_email_analysis(
      session=session,
      content=text,
      category=analysis["category"],
      response=analysis["response"],
      processing_time_ms=processing_time
    )
    
    return EmailResponse(
      category=analysis["category"],
      response=analysis["response"]
    )
    
  except Exception as e:
    raise HTTPException(
      status_code=HTTPStatus.BAD_REQUEST,
      detail=f"Error get email analysis {e}"
    )
  