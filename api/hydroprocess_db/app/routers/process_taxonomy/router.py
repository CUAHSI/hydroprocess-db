from typing import List

from fastapi import APIRouter, Depends
from sqlmodel import select

from app.db import get_session
from app.models import ProcessTaxonomy

router = APIRouter()


@router.get(
    "/",
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
