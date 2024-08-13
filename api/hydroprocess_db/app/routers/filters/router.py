from typing import List

from fastapi import APIRouter, Depends
from sqlmodel import select

from app.db import get_session
from app.models import ProcessTaxonomy, SpatialZoneType, TemporalZoneType

router = APIRouter()


@router.get(
    "/process_taxonomies",
    description="Get all process taxonomy entries.",
    response_model=List[ProcessTaxonomy],
)
def get_process_taxonomy_entries(*, session=Depends(get_session)):
    """
    Get process taxonomy entries from the database.

    Parameters:
    - session: The async session to use for database operations.

    Returns:
    - A list of process taxonomy entries.
    """
    process_taxonomy_entries = session.exec(select(ProcessTaxonomy)).all()
    return process_taxonomy_entries


@router.get(
    "/spatial_zones",
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


@router.get(
    "/temporal_zones",
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
