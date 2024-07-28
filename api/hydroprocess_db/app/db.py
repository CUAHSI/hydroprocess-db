from enum import Enum
from typing import List, Optional, Tuple

import httpx
from sqlmodel import Field, Session, SQLModel, create_engine
from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseOAuthAccountTableUUID, SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase
# https://github.com/fastapi-users/fastapi-users/discussions/861
# https://github.com/fastapi-users/fastapi-users-db-sqlmodel
# https://stackoverflow.com/questions/70694787/fastapi-fastapi-users-with-database-adapter-for-sqlmodel-users-table-is-not-crea
# https://gist.github.com/juftin/91dee06998771f13788880d387d7022d
from hydroprocess_db.config import get_settings

SQLITE_FILE = get_settings().sqlite_file_name
sqlite_url = f"sqlite:///{SQLITE_FILE}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_db_session():
    with Session(engine) as session:
        yield session


class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, SQLModel):
    # https://fastapi-users.github.io/fastapi-users/latest/configuration/oauth/?h=#configuration
    pass


class PhaseEnum(str, Enum):
    RUNNING = "Running"
    SUCCEEDED = "Succeeded"
    FAILED = "Failed"
    PENDING = "Pending"
    ERROR = "Error"


class Submission(SQLModel):
    workflow_id: str
    workflow_name: str
    phase: Optional[PhaseEnum] = None
    startedAt: Optional[str] = None
    finishedAt: Optional[str] = None
    estimatedDuration: Optional[int] = None


class User(SQLAlchemyBaseUserTableUUID, SQLModel):
    oauth_accounts: List[OAuthAccount] = Field(default_factory=list)
    submissions: List[Submission] = Field(default_factory=list)
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

    def get_submission(self, workflow_id: str) -> Submission:
        try:
            return next(submission for submission in self.submissions if submission.workflow_id == workflow_id)
        except:
            return None

    def running_submissions(self) -> list[Submission]:
        return [submission for submission in self.submissions if submission.phase == PhaseEnum.RUNNING]

    async def update_submission(self, submission: Submission) -> None:
        if self.get_submission(submission.workflow_id):
            self.submissions = [
                submission if submission.workflow_id == ws.workflow_id else ws for ws in self.submissions
            ]
        else:
            self.submissions.append(submission)
        await self.save()


async def get_user_db(session: Session = Depends(get_db_session)):
    yield SQLAlchemyUserDatabase(session, User, OAuthAccount)
