from typing import List

from fastapi import APIRouter, Depends
from sqlmodel import select

from app.db import get_session
from app.models import (
    Citation,
    Location,
    ModelType,
    PerceptualModel,
    ProcessTaxonomy,
    SpatialZoneType,
    TemporalZoneType,
)

router = APIRouter()


@router.get(
    "/",
    description="Get all perceptual models.",
    response_model=List[PerceptualModel],
)
def get_perceptual_models(*, session=Depends(get_session)):
    """
    Get perceptual models from the database.

    Parameters:
    - session: The async session to use for database operations.

    Returns:
    - A list of perceptual models.
    """
    models = session.exec(select(PerceptualModel))
    return models


@router.get(
    "/{model_id}",
    description="Get a perceptual model by ID.",
    response_model=PerceptualModel,
)
async def get_perceptual_model_by_id(model_id: int, session=Depends(get_session)):
    """
    Get a perceptual model by ID.

    Parameters:
    - model_id: The ID of the perceptual model to get.
    - session: The async session to use for database operations.

    Returns:
    - The perceptual model with the specified ID.
    """
    model = session.get(PerceptualModel, model_id)
    return model


@router.get(
    "/{model_id}/location",
    description="Get the location for a perceptual model by ID.",
    response_model=Location | None,
)
async def get_perceptual_model_location(model_id: int, session=Depends(get_session)):
    """
    Get the location for a perceptual model by ID.

    Parameters:
    - model_id: The ID of the perceptual model to get the location for.
    - session: The async session to use for database operations.

    Returns:
    - The location for the perceptual model with the specified ID.
    """
    model = session.get(PerceptualModel, model_id)
    location = model.location
    return location


@router.get(
    "/{model_id}/citation",
    description="Get the citation for a perceptual model by ID.",
    response_model=Citation | None,
)
async def get_perceptual_model_citation(model_id: int, session=Depends(get_session)):
    """
    Get the citation for a perceptual model by ID.

    Parameters:
    - model_id: The ID of the perceptual model to get the citation for.
    - session: The async session to use for database operations.

    Returns:
    - The citation for the perceptual model with the specified ID.
    """
    model = session.get(PerceptualModel, model_id)
    citation = model.citation
    return citation


@router.get(
    "/{model_id}/spatial_zone_type",
    description="Get the spatial zone type for a perceptual model by ID.",
    response_model=SpatialZoneType | None,
)
async def get_perceptual_model_spatial_zone_type(model_id: int, session=Depends(get_session)):
    """
    Get the spatial zone type for a perceptual model by ID.

    Parameters:
    - model_id: The ID of the perceptual model to get the spatial zone type for.
    - session: The async session to use for database operations.

    Returns:
    - The spatial zone type for the perceptual model with the specified ID.
    """
    model = session.get(PerceptualModel, model_id)
    spatial_zone_type = model.spatial_zone_type
    return spatial_zone_type


@router.get(
    "/{model_id}/temporal_zone_type",
    description="Get the temporal zone type for a perceptual model by ID.",
    response_model=TemporalZoneType | None,
)
async def get_perceptual_model_temporal_zone_type(model_id: int, session=Depends(get_session)):
    """
    Get the temporal zone type for a perceptual model by ID.

    Parameters:
    - model_id: The ID of the perceptual model to get the temporal zone type for.
    - session: The async session to use for database operations.

    Returns:
    - The temporal zone type for the perceptual model with the specified ID.
    """
    model = session.get(PerceptualModel, model_id)
    temporal_zone_type = model.temporal_zone_type
    return temporal_zone_type


@router.get(
    "/{model_id}/model_type",
    description="Get the model type for a perceptual model by ID.",
    response_model=ModelType | None,
)
async def get_perceptual_model_model_type(model_id: int, session=Depends(get_session)):
    """
    Get the model type for a perceptual model by ID.

    Parameters:
    - model_id: The ID of the perceptual model to get the model type for.
    - session: The async session to use for database operations.

    Returns:
    - The model type for the perceptual model with the specified ID.
    """
    model = session.get(PerceptualModel, model_id)
    model_type = model.model_type
    return model_type


@router.get(
    "/{model_id}/process_taxonomies",
    description="Get the process taxonomies for a perceptual model by ID.",
    response_model=List[ProcessTaxonomy] | None,
)
async def get_perceptual_model_process_taxonomies(model_id: int, session=Depends(get_session)):
    """
    Get the process taxonomies for a perceptual model by ID.

    Parameters:
    - model_id: The ID of the perceptual model to get the process taxonomies for.
    - session: The async session to use for database operations.

    Returns:
    - The process taxonomies for the perceptual model with the specified ID.
    """
    model = session.get(PerceptualModel, model_id)
    process_taxonomies = model.process_taxonomies
    return process_taxonomies
