import { Injectable } from '@nestjs/common';
import { envs } from '../config';

@Injectable()
export class AuthService {
  private readonly authServiceUrl: string;

  constructor() {
    let url = envs.authAzure
      ? envs.authAzure
      : `${envs.protocol}://${envs.authHost}:${envs.authPort}`;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    this.authServiceUrl = url;
  }

  getGoogleAuthUrl(): string {
    return `${this.authServiceUrl}/auth/google`;
  }
}
