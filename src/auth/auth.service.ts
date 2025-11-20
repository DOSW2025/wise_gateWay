import { Injectable } from '@nestjs/common';
import { envs } from '../config/envs';

@Injectable()
export class AuthService {
  private readonly authServiceUrl: string;

  constructor() {
    //this.authServiceUrl = `http://${envs.authhost}:${envs.authport}`;
    this.authServiceUrl = `https://${envs.authazure}`;
  }

  getGoogleAuthUrl(): string {
    return `${this.authServiceUrl}/auth/google`;
  }
}
