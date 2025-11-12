import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface ProxyResponse {
  data: any;
  headers?: Record<string, any>;
  status?: number;
}

@Injectable()
export class ProxyResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        // Si la respuesta tiene estructura de proxy (con headers)
        if (response && typeof response === 'object' && 'data' in response) {
          const ctx = context.switchToHttp();
          const res = ctx.getResponse<Response>();

          // Copiar headers importantes
          if (response.headers) {
            const headersToProxy = [
              'set-cookie',
              'authorization',
              'content-type',
              'cache-control',
            ];

            headersToProxy.forEach((headerName) => {
              const headerValue = response.headers[headerName];
              if (headerValue) {
                res.setHeader(headerName, headerValue);
              }
            });
          }

          // Establecer status code si existe
          if (response.status) {
            res.status(response.status);
          }

          // Retornar solo el data
          return response.data;
        }

        // Si no es una respuesta de proxy, retornar tal cual
        return response;
      }),
    );
  }
}
