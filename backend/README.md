## Backend (FastAPI + Supabase)

This backend exposes authentication and profile endpoints on top of Supabase auth and database.

### Environment

The backend reads configuration from `.env` in the `backend` directory:

- `SUPABASE_URL` – `https://<project>.supabase.co`
- `SUPABASE_ANON_KEY` – Supabase anon public key
- `FRONTEND_ORIGIN_MAIN` – primary frontend origin, default `http://localhost:3000`
- `FRONTEND_ORIGIN_ALT` – secondary frontend origin, default `http://localhost:5173`

### Running the server

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Health check:

- `GET /` → `{ "status": "ok" }`

---

### Auth API

All auth routes are mounted under `/auth`.

#### `POST /auth/sign-up`

Registers a new user through Supabase auth.

- **Query/body parameters**:
  - `email` – string, required
  - `password` – string, required
- **Success response** `200 OK`:

```json
{
  "user_id": "<uuid>",
  "email": "user@example.com"
}
```

- **Error responses**:
  - `400 Bad Request` – unable to register user

#### `POST /auth/sign-in`

Signs in an existing user and returns Supabase auth tokens.

- **Query/body parameters**:
  - `email` – string, required
  - `password` – string, required
- **Success response** `200 OK`:

```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>",
  "user_id": "<uuid>",
  "email": "user@example.com"
}
```

- **Error responses**:
  - `401 Unauthorized` – invalid credentials

---

### Profiles API

Profiles are stored in the Supabase `profiles` table.

All routes are mounted under `/profiles`.

#### `GET /profiles/`

Returns all profiles from the database.

- **Success response** `200 OK`:

```json
[
  {
    "id": "<uuid>",
    "email": "user@example.com",
    "full_name": "User Name",
    "created_at": "2025-01-01T00:00:00Z"
  }
]
```

- **Error responses**:
  - `500 Internal Server Error` – Supabase query failed

#### `POST /profiles/`

Creates a new profile record.

- **Query/body parameters**:
  - `email` – string, required
  - `full_name` – string, required
- **Success response** `200 OK`:

```json
{
  "id": "<uuid>",
  "email": "user@example.com",
  "full_name": "User Name",
  "created_at": "2025-01-01T00:00:00Z"
}
```

- **Error responses**:
  - `400 Bad Request` – insert failed or Supabase returned an error


