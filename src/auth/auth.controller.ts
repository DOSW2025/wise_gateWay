import { Controller, Get, Res, HttpStatus, Logger, Query } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { envs } from '../config/envs';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) { }

  @Get('google')
  @ApiOperation({ 
    summary: 'Iniciar autenticación con Google',
    description: 'Redirige al usuario al flujo de autenticación OAuth de Google. Este endpoint inicia el proceso de login con Google.'
  })
  @ApiResponse({ 
    status: 307, 
    description: 'Redirección temporal al servicio de autenticación de Google' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error al iniciar el proceso de autenticación',
    schema: {
      example: {
        statusCode: 500,
        message: 'Error al iniciar el proceso de autenticación'
      }
    }
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
    description: 'Endpoint que recibe la respuesta de Google después de la autenticación. Redirige al frontend con el token JWT y la información del usuario o un mensaje de error.'
  })
  @ApiQuery({ 
    name: 'token', 
    required: false, 
    description: 'Token JWT generado después de una autenticación exitosa',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  @ApiQuery({ 
    name: 'user', 
    required: false, 
    description: 'Información del usuario codificada en Base64 o JSON string',
    example: 'eyJpZCI6IjEyMyIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSJ9'
  })
  @ApiQuery({ 
    name: 'error', 
    required: false, 
    description: 'Mensaje de error si la autenticación falló',
    example: 'authentication_failed'
  })
  @ApiResponse({ 
    status: 307, 
    description: 'Redirección al frontend con los parámetros de resultado (éxito o error)' 
  })
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
