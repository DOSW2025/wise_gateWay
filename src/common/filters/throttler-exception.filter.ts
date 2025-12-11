import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Response } from 'express';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ThrottlerExceptionFilter.name);

  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    this.logger.warn(
      `Rate limit exceeded for ${request.ip} - ${request.method} ${request.url}`,
    );

    response.status(HttpStatus.TOO_MANY_REQUESTS).json({
      success: false,
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      message: 'Has excedido el límite de solicitudes. Intenta de nuevo en un minuto.',
      error: 'Too Many Requests',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
