import { Controller, Get, Res, HttpStatus, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('google')
  async googleAuth(@Res() res: Response): Promise<void> {
    try {
      const authUrl = this.authService.getGoogleAuthUrl();
      this.logger.log(`Redirecting to Google OAuth: ${authUrl}`);
      res.redirect(authUrl);
    } catch (error) {
      this.logger.error('Error redirecting to Google OAuth', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al iniciar el proceso de autenticación',
      });
    }
  }
}
