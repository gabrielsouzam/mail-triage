import pytest
import io
from fastapi import UploadFile
from utils.get_file_content import get_file_content_util


@pytest.mark.asyncio
async def test_txt_file_processing():
  content = b"Este e um email de teste solicitando relatorio urgente para reuniao"
  file = UploadFile(
      filename="test.txt",
      file=io.BytesIO(content)
  )
  
  result = await get_file_content_util(file)
  assert "email de teste" in result
  assert "relatorio" in result
  assert "urgente" in result


@pytest.mark.asyncio
async def test_invalid_file_type():
  file = UploadFile(
    filename="test.docx",
    file=io.BytesIO(b"content")
  )
  
  with pytest.raises(Exception) as exc_info:
    await get_file_content_util(file)
  assert "Invalid file type" in str(exc_info.value)


@pytest.mark.asyncio
async def test_empty_txt_file():
  file = UploadFile(
      filename="test.txt",
      file=io.BytesIO(b"")
  )
  
  with pytest.raises(Exception) as exc_info:
    await get_file_content_util(file)
  assert exc_info.value is not None


@pytest.mark.asyncio
async def test_txt_file_with_whitespace_only():
  file = UploadFile(
    filename="test.txt",
    file=io.BytesIO(b"   \n\t  ")
  )
  
  with pytest.raises(Exception) as exc_info:
    await get_file_content_util(file)
  assert exc_info.value is not None


@pytest.mark.asyncio
async def test_txt_file_with_special_characters():
  content = "Olá! Preciso do relatório urgente. Obrigado!".encode('utf-8')
  file = UploadFile(
    filename="test.txt",
    file=io.BytesIO(content)
  )
  
  result = await get_file_content_util(file)
  assert "Olá" in result
  assert "relatório" in result
  assert "Obrigado" in result


@pytest.mark.asyncio
async def test_file_extension_case_insensitive():
  content = b"Email content here for testing purposes"
  file = UploadFile(
    filename="test.TXT",
    file=io.BytesIO(content)
  )
  
  result = await get_file_content_util(file)
  assert "Email content" in result
