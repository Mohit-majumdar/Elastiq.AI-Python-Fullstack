from typing import Annotated

from fastapi import Depends
from sqlalchemy import create_engine
from sqlmodel import Session, SQLModel
from pathlib import Path

db_file = "database.db"

db_path = Path(__file__).parent / db_file

db_path.touch(exist_ok=True)


SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_file}"
connect_args = {"check_same_thread": False}
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(bind=engine)


def get_session():
    with Session(engine) as session:
        yield session


sessionDep = Annotated[Session, Depends(get_session)]
