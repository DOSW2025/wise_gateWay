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
      const errorUrl = `${envs.frontendUrl}/login?error=${encodeURIComponent(error)}`;
      res.redirect(HttpStatus.TEMPORARY_REDIRECT, errorUrl);
      return;
    }

    const redirectUrl = `${envs.frontendUrl}/auth/callback?token=${encodeURIComponent(token)}&user=${encodeURIComponent(user)}`;
    this.logger.log(`Redirecting to frontend: ${redirectUrl}`);
    res.redirect(HttpStatus.TEMPORARY_REDIRECT, redirectUrl);
  }
}
