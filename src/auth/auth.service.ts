import { Injectable } from '@nestjs/common';
import { envs } from '../config';

@Injectable()
export class AuthService {
  private readonly authServiceUrl: string;

  constructor() {
    this.authServiceUrl = envs.authAzure
      ? `${envs.protocol}://${envs.authAzure}`
      : `${envs.protocol}://${envs.authHost}:${envs.authPort}`;
  }

  getGoogleAuthUrl(): string {
    return `${this.authServiceUrl}/auth/google`;
  }
}
