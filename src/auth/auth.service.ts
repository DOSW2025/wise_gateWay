import { Injectable } from '@nestjs/common';
import { envs } from '../config/envs';

@Injectable()
export class AuthService {
  private readonly authServiceUrl: string;

  constructor() {
    this.authServiceUrl = envs.authazure || `${envs.authprotocol}://${envs.authhost}:${envs.authport}`;
  }

  getGoogleAuthUrl(): string {
    return `${this.authServiceUrl}/auth/google`;
  }
}
