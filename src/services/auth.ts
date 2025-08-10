import { httpClient } from '../lib/http-client';
import { API_CONFIG } from '../lib/api-config';
import type {
  SignInCredentials,
  SignUpCredentials,
  AuthResponse,
  User,
} from '../types/auth';

class AuthService {
  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.SIGN_IN,
      credentials
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Sign in failed');
    }

    // Store token in HTTP client
    httpClient.setAuthToken(response.data.token);

    return response.data;
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.SIGN_UP,
      credentials
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Sign up failed');
    }

    // Store token in HTTP client
    httpClient.setAuthToken(response.data.token);

    return response.data;
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.REFRESH_TOKEN
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Token refresh failed');
    }

    // Update token in HTTP client
    httpClient.setAuthToken(response.data.token);

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await httpClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local token
      httpClient.removeAuthToken();
    }
  }

  async getUserProfile(): Promise<User> {
    const response = await httpClient.get<User>(
      API_CONFIG.ENDPOINTS.USER_PROFILE
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch user profile');
    }

    return response.data;
  }

  // Utility methods
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
