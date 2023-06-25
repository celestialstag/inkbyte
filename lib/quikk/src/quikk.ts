import FormData from "form-data";
import fetch from "cross-fetch";

import {
  GetParams,
  HTTPStatusCodes,
  PostParams,
  QuikkConfig,
  QuikkParams,
  QuikkResponse,
} from "./types";

export class Quikk {
  private readonly protocol: "http" | "https";

  private readonly base_url: string;
  private readonly base_port?: number;
  private readonly base_path?: string;

  public api_token: string | null = null;
  private readonly api_token_type: string;
  private readonly api_version?: string;

  private readonly api_url: string;

  constructor(private readonly config: QuikkConfig) {
    this.protocol = config.protocol || "https";

    this.base_url = config.base_url;
    this.base_port = config.base_port;
    this.base_path = config.base_path;

    this.api_token = config.api_token ?? null;
    this.api_token_type = config.api_token_type || "Basic";
    this.api_version = config.api_version;

    this.api_url = [
      this.base_port
        ? [this.protocol, `//${this.base_url}`, this.base_port].join(":")
        : [this.protocol, `//${this.base_url}`].join(":"),
      this.base_path,
      this.api_version,
    ]
      .filter((x) => !!x)
      .join("/");
  }

  public setApiToken = (token: string) => {
    this.api_token = token;
  };

  public clearToken = () => {
    this.api_token = null;
  };

  public fetch = async <T = unknown, K = unknown>(
    path: string,
    { method, headers, body, formData, parameters = {} }: QuikkParams<K> = {},
  ) => {
    const formPayload = new FormData();
    if (formData && Object.keys(formData)) {
      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key]);
      });
    }

    const data = await (fetch(
      parameters && Object.keys(parameters).length > 0
        ? [
            [this.api_url, path].join("/"),
            Object.keys(parameters)
              .map((x) => [x, parameters[x]].join("="))
              .join("&"),
          ].join("?")
        : [this.api_url, path].join("/"),
      {
        method: method?.toUpperCase() ?? "GET",
        headers: {
          ...(formData ? {} : { "Content-Type": "application/json" }),
          ...(this.api_token
            ? { Authorization: `${this.api_token_type} ${this.api_token}` }
            : {}),
          ...(headers ? headers : {}),
        },
        body: formData
          ? (formPayload as unknown as BodyInit)
          : body
          ? typeof body === "string"
            ? body
            : JSON.stringify(body)
          : undefined,
      },
    ) as QuikkResponse<T>);
    return data;
  };

  public post = async <T, K = unknown, R = unknown>(
    path: string,
    { headers, parameters, body, formData }: PostParams<K> = {},
  ): Promise<
    | { ok: false; data: R | null; error: string; status: HTTPStatusCodes }
    | { ok: true; data: T; error: null }
  > => {
    const data = await this.fetch<T>(path, {
      method: "post",
      headers,
      parameters,
      body,
      formData,
    });
    const responseBody = await (await data.blob()).text();
    if (data.ok) {
      return {
        ok: true,
        data: await (async () => {
          try {
            return JSON.parse(responseBody) || null;
          } catch {
            try {
              return responseBody || null;
            } catch {
              return null;
            }
          }
        })(),
        error: null,
      };
    }
    return {
      ok: false,
      data: await (async () => {
        try {
          return JSON.parse(responseBody) || null;
        } catch {
          try {
            return responseBody || null;
          } catch {
            return null;
          }
        }
      })(),
      error: data.statusText,
      status: data.status as HTTPStatusCodes,
    };
  };

  public search = async <T, K = unknown, R = unknown>(
    path: string,
    { headers, parameters, body, formData }: PostParams<K> = {},
  ): Promise<
    | { ok: false; data: R | null; error: string; status: HTTPStatusCodes }
    | { ok: true; data: T; error: null }
  > => {
    const data = await this.fetch<T>(path, {
      method: "search",
      headers,
      parameters,
      body,
      formData,
    });
    const responseBody = await (await data.blob()).text();
    if (data.ok) {
      return {
        ok: true,
        data: await (async () => {
          try {
            return JSON.parse(responseBody) || null;
          } catch {
            try {
              return responseBody || null;
            } catch {
              return null;
            }
          }
        })(),
        error: null,
      };
    }
    return {
      ok: false,
      data: await (async () => {
        try {
          return JSON.parse(responseBody) || null;
        } catch {
          try {
            return responseBody || null;
          } catch {
            return null;
          }
        }
      })(),
      error: data.statusText,
      status: data.status as HTTPStatusCodes,
    };
  };

  public get = async <T, R = unknown>(
    path: string,
    { headers, parameters }: GetParams = {},
  ): Promise<
    | { ok: false; data: R | null; error: string; status: HTTPStatusCodes }
    | { ok: true; data: T; error: null }
  > => {
    const data = await this.fetch<T>(path, {
      method: "get",
      headers,
      parameters,
    });
    const responseBody = await (await data.blob()).text();
    if (data.ok) {
      return {
        ok: true,
        data: await (async () => {
          try {
            return JSON.parse(responseBody) || null;
          } catch {
            try {
              return responseBody || null;
            } catch {
              return null;
            }
          }
        })(),
        error: null,
      };
    }
    return {
      ok: false,
      data: await (async () => {
        try {
          return JSON.parse(responseBody) || null;
        } catch {
          try {
            return responseBody || null;
          } catch {
            return null;
          }
        }
      })(),
      error: data.statusText,
      status: data.status as HTTPStatusCodes,
    };
  };

  public patch = async <T, K = unknown, R = unknown>(
    path: string,
    { headers, parameters, body, formData }: PostParams<K> = {},
  ): Promise<
    | { ok: false; data: R | null; error: string; status: HTTPStatusCodes }
    | { ok: true; data: T; error: null }
  > => {
    const data = await this.fetch<T>(path, {
      method: "patch",
      headers,
      parameters,
      body,
      formData,
    });
    const responseBody = await (await data.blob()).text();

    if (data.ok) {
      return {
        ok: true,
        data: await (async () => {
          try {
            return JSON.parse(responseBody) || null;
          } catch {
            try {
              return responseBody || null;
            } catch {
              return null;
            }
          }
        })(),
        error: null,
      };
    }
    return {
      ok: false,
      data: await (async () => {
        try {
          return JSON.parse(responseBody) || null;
        } catch {
          try {
            return responseBody || null;
          } catch {
            return null;
          }
        }
      })(),
      error: data.statusText,
      status: data.status as HTTPStatusCodes,
    };
  };

  public delete = async <T, R = unknown>(
    path: string,
    { headers, parameters }: GetParams = {},
  ): Promise<
    | { ok: false; data: R | null; error: string; status: HTTPStatusCodes }
    | { ok: true; data: T; error: null }
  > => {
    const data = await this.fetch<T>(path, {
      method: "delete",
      headers,
      parameters,
    });
    const responseBody = await (await data.blob()).text();
    if (data.ok) {
      return {
        ok: true,
        data: await (async () => {
          try {
            return JSON.parse(responseBody) || null;
          } catch {
            try {
              return responseBody || null;
            } catch {
              return null;
            }
          }
        })(),
        error: null,
      };
    }
    return {
      ok: false,
      data: await (async () => {
        try {
          return JSON.parse(responseBody) || null;
        } catch {
          try {
            return responseBody || null;
          } catch {
            return null;
          }
        }
      })(),
      error: data.statusText,
      status: data.status as HTTPStatusCodes,
    };
  };
}
