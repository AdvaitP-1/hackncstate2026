from typing import Any, Dict, List

from app.core.supabase_client import supabase_client


def fetch_all_profiles() -> List[Dict[str, Any]]:
    response = supabase_client.table("profiles").select("*").execute()

    if response.error is not None:
        raise RuntimeError(response.error.message)

    return response.data or []


def create_profile(email: str, full_name: str) -> Dict[str, Any]:
    response = (
        supabase_client.table("profiles")
        .insert({"email": email, "full_name": full_name})
        .execute()
    )

    if response.error is not None:
        raise RuntimeError(response.error.message)

    if not response.data:
        raise RuntimeError("Profile creation returned no data")

    return response.data[0]


