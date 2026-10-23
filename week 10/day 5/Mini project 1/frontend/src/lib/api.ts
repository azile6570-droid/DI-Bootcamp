const apiBase = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";
let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${apiBase}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 401) return null;
          const body = await response.json().catch(() => null) as { message?: string } | null;
          throw new Error(body?.message ?? "Unable to refresh your session.");
        }
        const result: { accessToken: string } = await response.json();
        setAccessToken(result.accessToken);
        window.dispatchEvent(new CustomEvent("auth:token-refreshed", { detail: result.accessToken }));
        return result.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const send = (token: string | null): Promise<Response> => {
    const headers = new Headers(options.headers);
    if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return fetch(`${apiBase}${path}`, { ...options, headers, credentials: "include" });
  };

  let response = await send(accessToken);
  if (response.status === 401 && !path.startsWith("/auth/")) {
    const token = await refreshAccessToken();
    if (token) response = await send(token);
    else {
      setAccessToken(null);
      window.dispatchEvent(new Event("auth:expired"));
    }
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(body?.message ?? "The request could not be completed.");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function authRequest<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    const result = await response.json().catch(() => null) as { message?: string } | null;
    throw Object.assign(
      new Error(result?.message ?? "The request could not be completed."),
      { status: response.status },
    );
  }
  return response.json() as Promise<T>;
}
