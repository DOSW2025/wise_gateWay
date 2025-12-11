import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  ErrorResponse,
  MicroserviceErrorResponse,
} from '../interfaces/error-response.interface';

/**
 * Interfaz mínima para tipos de error de Axios.
 * Define la estructura esperada sin depender de tipos externos.
 */
interface AxiosErrorLike {
  isAxiosError: boolean;
  response?: {
    status: number;
    data: unknown;
  };
  request?: unknown;
  message: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let error = 'Internal Server Error';

    if (this.isAxiosError(exception)) {
      const axiosError = exception as AxiosErrorLike;

      if (axiosError.response) {
        status = axiosError.response.status;
        const responseData =
          axiosError.response.data as MicroserviceErrorResponse;

        message = responseData.message || responseData.error || message;
        error = responseData.error || error;

        this.logger.error(
          `Microservice error: ${JSON.stringify(responseData)}`,
        );

        response.status(status).json(responseData);
        return;
      } else if (axiosError.request) {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Microservice is not available';
        error = 'Service Unavailable';

        this.logger.error('Microservice not available:', axiosError.message);
      }
    }
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        const responseObject = exceptionResponse as Record<string, unknown>;
        message =
          (responseObject.message as string | string[]) ||
          (message as string);
        error = (responseObject.error as string) || error;
      } else {
        message = exceptionResponse as string;
      }

      this.logger.warn(
        `HTTP ${status} on ${request.method} ${request.url}: ${JSON.stringify(message)}`,
      );
    }
    
    else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error('Unexpected error:', exception.stack);
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    };

    response.status(status).json(errorResponse);
  }

  private isAxiosError(error: unknown): error is AxiosErrorLike {
    return (
      typeof error === 'object' &&
      error !== null &&
      'isAxiosError' in error &&
      (error as AxiosErrorLike).isAxiosError === true
    );
  }
}
