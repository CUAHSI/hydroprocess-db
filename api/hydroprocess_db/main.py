from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import create_db_and_tables
from app.routers.perceptual_model.router import router as perceptual_model_router
from app.routers.process_taxonomy.router import router as process_taxonomy_router
from app.routers.statistics.router import router as statistics_router
from app.schemas import UserCreate, UserRead, UserUpdate
from app.users import auth_backend, fastapi_users
from config import get_settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Not needed if you setup a migration system like Alembic
    await create_db_and_tables()
    yield


app = FastAPI(servers=[{"url": get_settings().vite_app_api_url}], lifespan=lifespan)

origins = [get_settings().allow_origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
app.include_router(
    perceptual_model_router,
    prefix="/perceptual_model",
    tags=["perceptual_model"],
)
app.include_router(
    process_taxonomy_router,
    prefix="/process_taxonomy",
    tags=["process_taxonomy"],
)
app.include_router(
    statistics_router,
    prefix="/statistics",
    tags=["statistics"],
)
