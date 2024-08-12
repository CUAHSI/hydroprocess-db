from typing import AsyncGenerator
from urllib.parse import quote_plus

from fastapi import Depends
from fastapi_users_db_sqlmodel import SQLModelBaseUserDB, SQLModelUserDatabaseAsync
from sqlalchemy.engine import URL
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.ext.asyncio.session import AsyncSession

from config import get_settings

from . import models

settings = get_settings()

PG_USERNAME = settings.pg_username
PG_PASSWORD = quote_plus(settings.pg_password)
PG_HOST = settings.pg_host
PG_PORT = int(settings.pg_port)
PG_DBNAME = settings.pg_dbname

DATABASE_URL = URL.create(
    "postgresql+asyncpg",
    username=PG_USERNAME,
    password=PG_PASSWORD,
    host=PG_HOST,
    port=PG_PORT,
    database=PG_DBNAME,
)


class User(SQLModelBaseUserDB, table=True):
    pass


engine = create_async_engine(DATABASE_URL, future=True)
async_session_maker = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

SYNC_DATABASE_URL = URL.create(
    "postgresql+psycopg2",
    username=PG_USERNAME,
    password=PG_PASSWORD,
    host=PG_HOST,
    port=PG_PORT,
    database=PG_DBNAME,
)
sync_engine = create_engine(SYNC_DATABASE_URL)


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


def get_session():
    with Session(sync_engine) as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLModelUserDatabaseAsync(session, User)
