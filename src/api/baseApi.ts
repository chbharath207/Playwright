import { APIRequestContext } from '@playwright/test';

export interface ApiResponse<T> {
  status: number;
  body: T;
  ok: boolean;
  url: string;
}

export class BaseApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string
  ) {}

  private buildUrl(endpoint: string): string {
    const normalizedBaseUrl = this.baseUrl.replace(/\/+$/, '');
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');

    return `${normalizedBaseUrl}/${normalizedEndpoint}`;
  }

  private async parseBody<T>(response: Awaited<ReturnType<APIRequestContext['get']>>): Promise<T> {
    try {
      return (await response.json()) as T;
    } catch {
      return (await response.text()) as T;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.request.get(this.buildUrl(endpoint));
    const body = await this.parseBody<T>(response);

    return {
      status: response.status(),
      body,
      ok: response.ok(),
      url: response.url(),
    };
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    const response = await this.request.post(this.buildUrl(endpoint), { data });
    const body = await this.parseBody<T>(response);

    return {
      status: response.status(),
      body,
      ok: response.ok(),
      url: response.url(),
    };
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    const response = await this.request.put(this.buildUrl(endpoint), { data });
    const body = await this.parseBody<T>(response);

    return {
      status: response.status(),
      body,
      ok: response.ok(),
      url: response.url(),
    };
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.request.delete(this.buildUrl(endpoint));
    const body = await this.parseBody<T>(response);

    return {
      status: response.status(),
      body,
      ok: response.ok(),
      url: response.url(),
    };
  }
}
