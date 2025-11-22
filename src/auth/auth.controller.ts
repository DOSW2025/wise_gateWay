import { Controller, Get, Res, HttpStatus, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @Public()
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
}

