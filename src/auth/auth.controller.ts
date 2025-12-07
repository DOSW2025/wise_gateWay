import { Controller, Get, Res, HttpStatus, Logger, Query } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { envs } from '../config/envs';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) { }

  @Get('google')
  async googleAuth(@Res() res: Response): Promise<void> {
    try {
      const authServiceUrl = this.authService.getGoogleAuthUrl();
      this.logger.log(`Proxying to auth service: ${authServiceUrl}`);
      res.redirect(HttpStatus.TEMPORARY_REDIRECT, authServiceUrl);
    } catch (error) {
      this.logger.error('Error proxying to auth service', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al iniciar el proceso de autenticación',
      });
    }
  }

  @Get('callback')
  async googleAuthCallback(
    @Query('token') token: string,
    @Query('user') user: string,
    @Query('error') error: string,
    @Res() res: Response
  ): Promise<void> {
    if (error) {
      const url = new URL(envs.frontendUrl);
      const basePath = url.pathname.replace(/\/$/, '');
      url.pathname = `${basePath}/login`;
      url.searchParams.append('error', error);

      res.redirect(HttpStatus.TEMPORARY_REDIRECT, url.toString());
      return;
    }

    const url = new URL(envs.frontendUrl);
    const basePath = url.pathname.replace(/\/$/, '');
    url.pathname = `${basePath}/auth/callback`;
    url.searchParams.append('token', token);
    url.searchParams.append('user', user);

    const redirectUrl = url.toString();
    this.logger.log(`Redirecting to frontend: ${redirectUrl}`);
    res.redirect(HttpStatus.TEMPORARY_REDIRECT, redirectUrl);
  }
}
