from pydantic import BaseModel, Field, field_validator
from enum import Enum
  
class EnumCategory(str, Enum):
  PRODUCTIVE = "productive"
  UNPRODUCTIVE = "unproductive"

class EmailRequest(BaseModel):
    content: str = Field(
        description="Email text content to be analyzed",
        min_length=10,
        max_length=5000,
        examples=["Preciso do relatório urgente para hoje!"]
    )
    
    @field_validator('content')
    @classmethod
    def validate_content(cls, v: str) -> str:
        v = v.strip()
        
        if not v or v.isspace():
            raise ValueError("O conteúdo não pode estar vazio ou conter apenas espaços")
        
        if len(v.split()) < 3:
            raise ValueError("O conteúdo deve ter pelo menos 3 palavras")
        
        return v
    
class EmailResponse(BaseModel):
  category: EnumCategory = Field(
    description= "Email classification: productive or unproductive",
    examples=["productive", "unproductive"]
  )
  response: str = Field(
    description="Suggested response in Portuguese",
    examples=["I also wish you a great end of the year and happy holidays!"]
  )
  
class LLmEmailResponse(BaseModel):
  category: str
  response: str