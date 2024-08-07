from functools import lru_cache

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# had to use load_dotenv() to get the env variables to work during testing
load_dotenv()


class Settings(BaseSettings):

    database_url: str
    vite_app_api_url: str
    allow_origins: str


@lru_cache()
def get_settings() -> Settings:
    return Settings()
