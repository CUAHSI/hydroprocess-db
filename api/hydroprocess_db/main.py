from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import UserRead, UserUpdate
from app.users import SECRET, auth_backend, cuahsi_oauth_client, fastapi_users
from config import get_settings

# TODO: get oauth working with swagger/redoc
# Setting the base url for swagger docs
# https://github.com/tiangolo/fastapi/pull/1547
# https://swagger.io/docs/specification/api-host-and-base-path/
# https://fastapi.tiangolo.com/how-to/configure-swagger-ui/
# https://github.com/tiangolo/fastapi/pull/499
swagger_params = {
    "withCredentials": True,
    "oauth2RedirectUrl": cuahsi_oauth_client.authorize_endpoint,
    "swagger_ui_client_id": cuahsi_oauth_client.client_id,
}

app = FastAPI(servers=[{"url": get_settings().vite_app_api_url}], swagger_ui_parameters=swagger_params)

origins = [get_settings().allow_origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    fastapi_users.get_oauth_router(
        cuahsi_oauth_client, auth_backend, SECRET, redirect_url=get_settings().oauth2_redirect_url
    ),
    prefix="/auth/cuahsi",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_oauth_router(
        cuahsi_oauth_client,
        auth_backend,
        SECRET,
        redirect_url=get_settings().vite_oauth2_redirect_url
    ),
    prefix="/auth/front",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
