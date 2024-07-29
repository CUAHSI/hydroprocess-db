import httpx
from typing import AsyncGenerator, Optional, List, Tuple
from pydantic import UUID4
from fastapi import Depends
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel, Field, Relationship

from fastapi_users_db_sqlmodel import SQLModelBaseUserDB, SQLModelUserDatabaseAsync, SQLModelBaseOAuthAccount
# https://github.com/fastapi-users/fastapi-users/discussions/861
# https://github.com/fastapi-users/fastapi-users-db-sqlmodel
# https://stackoverflow.com/questions/70694787/fastapi-fastapi-users-with-database-adapter-for-sqlmodel-users-table-is-not-crea
# https://gist.github.com/juftin/91dee06998771f13788880d387d7022d
from config import get_settings

SQLITE_FILE = get_settings().sqlite_file_name
DATABASE_URL = f"sqlite+aiosqlite:///./{SQLITE_FILE}"

connect_args = {"check_same_thread": False}
engine = create_async_engine(DATABASE_URL, future=True, connect_args=connect_args)
async_session_maker = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


class UserOAuth(SQLModelBaseUserDB, table=True):
    # https://github.com/fastapi-users/fastapi-users-db-sqlmodel/blob/83980d7f20886120f4636a102ab1822b4c366f63/tests/conftest.py#L23-L25
    __tablename__ = "user_oauth"
    oauth_accounts: List["OAuthAccount"] = Relationship(
        back_populates="user",
        sa_relationship_kwargs={"lazy": "selectin", "cascade": "all, delete"},
    )


class OAuthAccount(SQLModelBaseOAuthAccount, table=True):
    user_id: UUID4 = Field(foreign_key="user_oauth.id")
    user: Optional[UserOAuth] = Relationship(back_populates="oauth_accounts")


class User(SQLModelBaseUserDB, table=True):
    name: Optional[str] = None
    username: Optional[str] = None
    given_name: Optional[str] = None
    family_name: Optional[str] = None

    async def update_profile(self):
        async def get_profile(token: str) -> Tuple[str, str]:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    get_settings().user_info_endpoint,
                    headers={"Authorization": f"Bearer {token}"},
                )
                return response.json()

        profile = await get_profile(self.oauth_accounts[0].access_token)
        self.name = profile['name']
        self.username = profile['preferred_username']
        self.given_name = profile['given_name']
        self.family_name = profile['family_name']
        await self.save()
    pass


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLModelUserDatabaseAsync(session, User)
