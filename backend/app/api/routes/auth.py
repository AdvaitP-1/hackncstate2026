from fastapi import APIRouter, HTTPException, status

from app.core.supabase_client import supabase_client


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/sign-up")
def register_user(email: str, password: str):
    response = supabase_client.auth.sign_up(
        {"email": email, "password": password}
    )

    if response.user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to register user",
        )

    return {"user_id": response.user.id, "email": response.user.email}


@router.post("/sign-in")
def sign_in_user(email: str, password: str):
    response = supabase_client.auth.sign_in_with_password(
        {"email": email, "password": password}
    )

    if response.user is None or response.session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    return {
        "access_token": response.session.access_token,
        "refresh_token": response.session.refresh_token,
        "user_id": response.user.id,
        "email": response.user.email,
    }

