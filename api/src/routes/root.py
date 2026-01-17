from fastapi import APIRouter

router = APIRouter()

@router.get("/", tags=["Root"])
async def get_root():
  return {
    "name": "MailTriage",
    "status": "It works!",
  }