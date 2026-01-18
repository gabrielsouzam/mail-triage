from sqlmodel import Session
from src.config.settings import engine

def get_db():
    with Session(engine) as session:
        yield session
