import pytest
from fastapi.testclient import TestClient


def test_email_analysis_validation_error_empty(client):
  response = client.post(
      "/email/analysis",
      json={"content": ""}
  )
  
  assert response.status_code == 422


def test_email_analysis_validation_error_short(client):
  response = client.post(
      "/email/analysis",
      json={"content": "Oi"}
  )
  
  assert response.status_code == 422


def test_email_analysis_validation_error_whitespace(client):
  response = client.post(
      "/email/analysis",
      json={"content": "   "}
  )
  
  assert response.status_code == 422


def test_email_analysis_missing_content(client):
  response = client.post(
      "/email/analysis",
      json={}
  )
  
  assert response.status_code == 422
