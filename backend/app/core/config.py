import os

from dotenv import load_dotenv


load_dotenv()


class Settings:
    def __init__(self) -> None:
        self.frontend_origins = [
            os.getenv("FRONTEND_ORIGIN_MAIN", "http://localhost:3000"),
            os.getenv("FRONTEND_ORIGIN_ALT", "http://localhost:5173"),
        ]
        self.supabase_url = os.getenv("SUPABASE_URL", "")
        self.supabase_anon_key = os.getenv("SUPABASE_ANON_KEY", "")

    @property
    def has_supabase_configuration(self) -> bool:
        return bool(self.supabase_url and self.supabase_anon_key)


settings = Settings()
