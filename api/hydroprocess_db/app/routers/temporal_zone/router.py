from typing import List

from fastapi import APIRouter, Depends
from sqlmodel import select

from app.db import get_session
from app.models import TemporalZoneType

router = APIRouter()


@router.get(
    "/",
    description="Get all temporal zone types",
    response_model=List[TemporalZoneType],
)
def get_temporal_zones_entries(*, session=Depends(get_session)):
    """
    Get temporal zone types from the database.

    Parameters:
    - session: The async session to use for database operations.

    Returns:
    - A list of temporal zone types.
    """
    temporal_zone_types = session.exec(select(TemporalZoneType)).all()
    return temporal_zone_types
