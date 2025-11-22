import { Request } from 'express';

export class JwtForwardingHelper {
  static extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return null;
    }

    return token;
  }

  static createAuthHeaders(request: Request): Record<string, string> {
    const token = this.extractToken(request);

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  static getAxiosConfig(request: Request): { headers: Record<string, string> } {
    return {
      headers: this.createAuthHeaders(request),
    };
  }
}
