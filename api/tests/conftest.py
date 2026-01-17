import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))

import pytest
from fastapi.testclient import TestClient
from app import app
from services.ai_service import AIService


@pytest.fixture
def client():
  """FastAPI test client fixture"""
  return TestClient(app)


@pytest.fixture
def ai_service():
  """AI service instance fixture"""
  return AIService()
