from typing import List

from fastapi import APIRouter, Depends
from sqlmodel import select

from app.db import get_session
from app.models import SpatialZoneType

router = APIRouter()


@router.get(
    "/",
    description="Get all spatial zone types",
    response_model=List[SpatialZoneType],
)
def get_spatial_zones_entries(*, session=Depends(get_session)):
    """
    Get spatial zone types from the database.

    Parameters:
    - session: The async session to use for database operations.

    Returns:
    - A list of spatial zone types.
    """
    spatial_zone_types = session.exec(select(SpatialZoneType)).all()
    return spatial_zone_types
