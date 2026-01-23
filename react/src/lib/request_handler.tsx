import type { BaseAPIResponse } from './types';

class RequestHandler {
  public id_token: string | null;

  constructor(id_token: string | null = null) {
    this.id_token = id_token;
  }

  async send<T = unknown>(
    url: string,
    method: string,
    params: unknown = {},
  ): Promise<BaseAPIResponse<T>> {

    const headers = {Authorization: this.id_token ? `Bearer ${this.id_token}` : ""};

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
}

export default RequestHandler;