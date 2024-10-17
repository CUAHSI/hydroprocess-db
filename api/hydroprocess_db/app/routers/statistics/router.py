from fastapi import APIRouter, Depends
from sqlmodel import select

from app.db import get_session
from app.models import ModelType, PerceptualModel

router = APIRouter()


@router.get(
    "/model_type_count",
    description="Get the count of models for each model type.",
    response_model=dict[str, int],
)
def get_model_count_by_type(*, session=Depends(get_session)):
    """
    Get the count of models for each model type.

    Parameters:
    - session: The async session to use for database operations.

    Returns:
    - A dictionary with the count of models for each model type.
    """
    model_types = session.exec(select(ModelType)).all()
    model_type_count = {}
    for model_type in model_types:
        matching_models = session.query(PerceptualModel).where(PerceptualModel.model_type_id == model_type.id)
        model_type_count[model_type.name] = matching_models.count()
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
