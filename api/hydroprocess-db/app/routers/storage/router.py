from fastapi import APIRouter

from subsetter.app.models import WorkflowDep
from subsetter.config import get_minio_client

router = APIRouter()


'''
@router.post('/bucket/create')
async def create_user_bucket(
    user: User = Depends(current_active_user), description="Creates a bucket named with the username"
):
    if not get_minio_client().bucket_exists(user.username):
        get_minio_client().make_bucket(user.username)

@router.get('/upload/{user_name}/workflow/{workflow_id}')
async def share_workflow_with_user(
    user_name: str, workflow_params: WorkflowDep, user: User = Depends(current_active_user)
):
    submission: Submission = workflow_params.submission
    submission.add_user(user_name)
    await user.update_submission(submission)
    return User.get(user.document_id)


@router.get('/remove/{user_name}/workflow/{workflow_id}')
async def share_workflow_with_user(
    user_name: str, workflow_params: WorkflowDep, user: User = Depends(current_active_user)
):
    submission: Submission = workflow_params.submission
    submission.remove_user(user_name)
    await user.update_submission(submission)
    return User.get(document_id=user.document_id)
'''
