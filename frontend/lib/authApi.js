const backendBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "http://localhost:8000";

async function postAuthRoute(path, body) {
  const response = await fetch(`${backendBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Auth request failed");
  }

  return response.json();
}

export async function registerUser({ email, password }) {
  return postAuthRoute("/auth/sign-up", { email, password });
}

export async function signInUser({ email, password }) {
  return postAuthRoute("/auth/sign-in", { email, password });
}
