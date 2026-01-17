import pytest
from pydantic import ValidationError
from schemas.email import EmailRequest


def test_valid_email_request():
  request = EmailRequest(content="Este é um email válido com conteúdo suficiente para análise")
  assert request.content == "Este é um email válido com conteúdo suficiente para análise"


def test_minimum_content_length():
  with pytest.raises(ValidationError) as exc_info:
      EmailRequest(content="Oi")
  
  assert "at least 10 characters" in str(exc_info.value).lower() or "min_length" in str(exc_info.value).lower()


def test_empty_content_validation():
  with pytest.raises(ValidationError):
      EmailRequest(content="")


def test_whitespace_only_validation():
  with pytest.raises(ValidationError):
      EmailRequest(content="   ")
  
  with pytest.raises(ValidationError):
      EmailRequest(content="\t\n  ")


def test_content_with_valid_length():
  valid_content = "Preciso do relatório urgente"
  request = EmailRequest(content=valid_content)
  assert len(request.content) >= 10
