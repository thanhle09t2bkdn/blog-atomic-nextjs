// API configuration and base utilities
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api',
  ENDPOINTS: {
    SIGN_IN: '/auth/email/login',
    SIGN_UP: '/auth/signup',
    REFRESH_TOKEN: '/auth/refresh',
    LOGOUT: '/auth/logout',
    USER_PROFILE: '/user/profile',
  },
  TIMEOUT: 10000, // 10 seconds
} as const;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, unknown>;
}

export class ApiClientError extends Error {
  status: number;
  details?: Record<string, unknown>;

  constructor(
    status: number,
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.details = details;
  }
}
