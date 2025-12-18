from fastapi import APIRouter, HTTPException, status

from app.core.profile_repository import create_profile, fetch_all_profiles


router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.get("/")
def list_profiles():
    try:
        profiles = fetch_all_profiles()
    except RuntimeError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
        ) from error

    return profiles


@router.post("/")
def create_profile_entry(email: str, full_name: str):
    try:
        profile = create_profile(email=email, full_name=full_name)
    except RuntimeError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        ) from error

    return profile


