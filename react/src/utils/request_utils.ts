import type { BaseAPIResponse } from '../types/types';

export default {
  requests
};

async function requests<T = unknown>(
  url: string,
  method: string,
  headers: Record<string, string>,
  params: unknown
): Promise<BaseAPIResponse<T>> {
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  console.group("API Request", `[${method}]: ${url}`);
  console.log("Headers", headers);

  let detail;
  if (method === "GET" || method === "DELETE") {
    detail = {
      method,
      headers,
    };
    url = `${url}?${new URLSearchParams(params as Record<string, string>)}`;
    console.log("Params", params);
  } else {
    detail = {
      method,
      headers,
      body: JSON.stringify(params),
    };
    console.log("Body", params);
  }

  const res = await fetch(url, detail);
  const result: BaseAPIResponse<T> = {
    status: res.status,
    headers: res.headers,
    body: await res.json(),
  };

  console.log("Response", result);
  console.groupEnd();
  return result;
};
