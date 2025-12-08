import { Controller, Get, Res, HttpStatus, Logger, Query } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { envs } from '../config/envs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) { }

  @Get('google')
  @ApiOperation({ 
    summary: 'Iniciar autenticación con Google',
    description: 'Redirige al usuario al flujo de autenticación de Google OAuth2'
  })
  @ApiResponse({ 
    status: 307, 
    description: 'Redirección temporal al servicio de autenticación de Google' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor al iniciar autenticación' 
  })
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
  @ApiOperation({ 
    summary: 'Callback de autenticación de Google',
    description: 'Recibe la respuesta del servicio de autenticación y redirige al frontend con el token'
  })
  @ApiQuery({ name: 'token', required: false, description: 'JWT token de autenticación' })
  @ApiQuery({ name: 'user', required: false, description: 'Información del usuario en formato JSON' })
  @ApiQuery({ name: 'error', required: false, description: 'Mensaje de error si la autenticación falló' })
  @ApiResponse({ 
    status: 307, 
    description: 'Redirección al frontend con el token o error' 
  })
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
