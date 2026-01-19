import re
import unicodedata


def preprocess_text_util(text: str) -> str:
    # 1. Unicode normalization (NFC - Canonical Decomposition followed by Canonical Composition)
    # This ensures consistent representation of accented characters (important for Portuguese)
    text = unicodedata.normalize('NFC', text)
    
    # 2. Remove excessive whitespace while preserving single spaces
    # Replace multiple spaces, tabs, newlines with single space
    text = re.sub(r'\s+', ' ', text)
    
    # 3. Normalize punctuation spacing
    # Remove spaces before punctuation
    text = re.sub(r'\s+([.,!?;:])', r'\1', text)
    # Add space after punctuation if missing (except for decimals)
    text = re.sub(r'([.,!?;:])([^\s\d])', r'\1 \2', text)
    
    # 4. Remove leading/trailing whitespace
    text = text.strip()
    
    # 5. Normalize multiple punctuation marks (e.g., "!!!" -> "!")
    text = re.sub(r'([!?.]){2,}', r'\1', text)
    
    # 6. Remove special characters that don't add semantic value
    # Keep: letters, numbers, common punctuation, Portuguese accents
    # Remove: control characters, unusual symbols
    text = re.sub(r'[^\w\s.,!?;:()\-áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]', '', text)
    
    return text
