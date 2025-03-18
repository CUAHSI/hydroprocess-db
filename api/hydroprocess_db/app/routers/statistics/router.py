from fastapi import APIRouter, Depends
from sqlmodel import select

from app.db import get_session
from app.models import ModelCountRequest, ModelType, PerceptualModel, ProcessTaxonomy

router = APIRouter()


@router.post(
    "/model_type_count",
    description="Get the count of models for each model type.",
    response_model=dict[str, int],
)
def get_model_count_by_type(request: ModelCountRequest, session=Depends(get_session)):
    model_types = session.exec(select(ModelType)).all()
    model_type_count = {}

    for model_type in model_types:
        query = session.query(PerceptualModel).where(PerceptualModel.model_type_id == model_type.id)

        if request.spatialzone_ids:
            query = query.where(PerceptualModel.spatialzone_id.in_(request.spatialzone_ids))

        if request.temporalzone_ids:
            query = query.where(PerceptualModel.temporalzone_id.in_(request.temporalzone_ids))

        if request.process_taxonomy_ids:
            query = query.join(PerceptualModel.process_taxonomies).where(
                ProcessTaxonomy.id.in_(request.process_taxonomy_ids)
            )

        matching_models = query.all()
        model_type_count[model_type.name] = len(matching_models)

    return model_type_count


@router.get(
    "/model_count",
    description="Get the count of models.",
    response_model=int,
)
def get_model_count(*, session=Depends(get_session)):
    """
    Get the count of models.

    Parameters:
    - session: The async session to use for database operations.

    Returns:
    - The count of models.
    """
    return session.query(PerceptualModel).count()
