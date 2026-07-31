import axios, { AxiosError, AxiosInstance } from 'axios';
import { TMDB_API_KEY } from '@env';
import { API_BASE_URL, REQUEST_TIMEOUT_MS } from '../constants/config';

type TmdbErrorBody = {
  status_message?: string;
  status_code?: number;
};

export class ApiError extends Error {
  readonly status?: number;
  readonly isNetworkError: boolean;

  constructor(message: string, status?: number, isNetworkError = false) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isNetworkError = isNetworkError;
  }
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
});

apiClient.interceptors.request.use(config => {
  config.params = { ...config.params, api_key: TMDB_API_KEY };
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError<TmdbErrorBody>) => {
    if (!error.response) {
      return Promise.reject(
        new ApiError(
          'Cannot reach the server. Check your connection and try again.',
          undefined,
          true,
        ),
      );
    }

    const { status, data } = error.response;
    const message =
      status === 401
        ? 'Invalid TMDB API key.'
        : data?.status_message ?? 'Something went wrong. Please try again.';

    return Promise.reject(new ApiError(message, status));
  },
);
