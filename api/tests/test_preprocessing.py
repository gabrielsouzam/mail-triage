import pytest
from utils.preprocess_text import preprocess_text_util


def test_multiple_spaces_normalization():
  text = "Preciso    do   relatório    urgente"
  result = preprocess_text_util(text)
  assert "  " not in result
  assert "Preciso do relatório urgente" == result


def test_trailing_whitespace_removal():
  text = "   Olá, preciso de ajuda   "
  result = preprocess_text_util(text)
  assert result == "Olá, preciso de ajuda"
  assert not result.startswith(" ")
  assert not result.endswith(" ")


def test_punctuation_normalization():
  text = "Boa tarde,qual o status???Preciso urgente!!!"
  result = preprocess_text_util(text)
  
  assert ", " in result or ",qual" not in result
  assert "???" not in result
  assert "!!!" not in result


def test_unicode_normalization():
  text = "Olá, poderia me enviar o relatório?"
  result = preprocess_text_util(text)
  
  assert "Olá" in result
  assert "relatório" in result


def test_newlines_and_tabs_normalization():
  text = "Preciso\ndo\trelatório\nurgente"
  result = preprocess_text_util(text)
  assert "\n" not in result
  assert "\t" not in result
  assert "Preciso do relatório urgente" == result


def test_empty_string():
  result = preprocess_text_util("")
  assert result == ""


def test_preserves_content():
  text = "Preciso do relatório de vendas para a reunião de amanhã"
  result = preprocess_text_util(text)
  
  assert "Preciso" in result
  assert "relatório" in result
  assert "vendas" in result
  assert "reunião" in result
  assert "amanhã" in result


def test_portuguese_accents_preserved():
  text = "Ação, decisão, informação, relatório, análise"
  result = preprocess_text_util(text)
  
  assert "Ação" in result
  assert "decisão" in result
  assert "informação" in result
  assert "relatório" in result
  assert "análise" in result
