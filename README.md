Run the backend:
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000

Environment configuration:
- Backend `.env` (in `backend/`):
  - SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
  - SUPABASE_ANON_KEY="YOUR_ANON_KEY_HERE"
  - FRONTEND_ORIGIN_MAIN="http://localhost:3000"
  - FRONTEND_ORIGIN_ALT="http://localhost:5173"

- Frontend `.env.local` (in `frontend/`):
  - NEXT_PUBLIC_BACKEND_BASE_URL="http://localhost:8000"
