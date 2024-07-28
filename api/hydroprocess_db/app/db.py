# from typing import List, Optional
# import httpx
from typing import AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
# from sqlalchemy.orm import relationship, Mapped
from sqlmodel import SQLModel
# from sqlmodel import Field
from sqlmodel.ext.asyncio.session import AsyncSession

from fastapi_users_db_sqlmodel import SQLModelBaseUserDB, SQLModelUserDatabaseAsync
from fastapi_users.db import SQLAlchemyBaseOAuthAccountTableUUID
# https://github.com/fastapi-users/fastapi-users/discussions/861
# https://github.com/fastapi-users/fastapi-users-db-sqlmodel
# https://stackoverflow.com/questions/70694787/fastapi-fastapi-users-with-database-adapter-for-sqlmodel-users-table-is-not-crea
# https://gist.github.com/juftin/91dee06998771f13788880d387d7022d
from hydroprocess_db.config import get_settings

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


class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID):
    # https://fastapi-users.github.io/fastapi-users/latest/configuration/oauth/?h=#configuration
    pass


class User(SQLModelBaseUserDB, table=True):
    # TODO: add OAuthAccount to User
    # oauth_accounts: List[OAuthAccount] = Field(default_factory=list)
    # oauth_accounts: Mapped[List[OAuthAccount]] = relationship(
    #     "OAuthAccount", lazy="joined"
    # )

    # name: Optional[str] = None
    # username: Optional[str] = None
    # given_name: Optional[str] = None
    # family_name: Optional[str] = None

    # async def update_profile(self):
    #     async def get_profile(token: str) -> Tuple[str, str]:
    #         async with httpx.AsyncClient() as client:
    #             response = await client.get(
    #                 get_settings().user_info_endpoint,
    #                 headers={"Authorization": f"Bearer {token}"},
    #             )
    #             return response.json()

    #     profile = await get_profile(self.oauth_accounts[0].access_token)
    #     self.name = profile['name']
    #     self.username = profile['preferred_username']
    #     self.given_name = profile['given_name']
    #     self.family_name = profile['family_name']
    #     await self.save()
    pass


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLModelUserDatabaseAsync(session, User)
