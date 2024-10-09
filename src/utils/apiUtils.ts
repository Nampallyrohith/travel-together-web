const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("jwt_token");

type ApiResponse<T> = {
  ok: boolean;
  status?: number;
  value?: T;
  error?: string;
};

export const makeApiRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: Record<string, unknown> | null
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body); // only add body for POST/PUT requests
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.warn(`API request failed with status: ${response.status}`);
      return {
        ok: false,
        status: response.status,
        value: await response.json(),
      };
    }

    return { ok: true, value: (await response.json()) as T };
  } catch (error) {
    console.error("Network or unexpected error:", error);
    return { ok: false, error: (error as Error).message }; // Provide error message
  }
};
