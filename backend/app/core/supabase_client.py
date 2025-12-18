from supabase import create_client

from app.core.config import settings


def create_supabase_client():
    if not settings.has_supabase_configuration:
        raise RuntimeError("Supabase configuration is missing")

    return create_client(settings.supabase_url, settings.supabase_anon_key)


supabase_client = create_supabase_client()

