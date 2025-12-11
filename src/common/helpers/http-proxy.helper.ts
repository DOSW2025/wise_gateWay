import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError, Observable } from 'rxjs';

/**
 * Tipo para respuesta HTTP de Axios
 * Proporciona type safety para el objeto de respuesta
 */
interface AxiosResponseData {
  data: unknown;
  headers: Record<string, unknown>;
  status: number;
}

export interface ProxyResponse {
  data: unknown;
  headers: Record<string, unknown>;
  status: number;
}

/**
 * Helper para hacer llamadas a microservicios propagando headers (Es por el JWT)
 */
export class HttpProxyHelper {
  /**
   * Realiza una petición HTTP al microservicio propagando headers importantes
   * @param httpService - Servicio HTTP de NestJS
   * @param url - URL del microservicio
   * @param method - Método HTTP
   * @param data - Datos a enviar
   * @param authHeader - Header de autorización (JWT) del cliente
   * @param additionalHeaders - Headers adicionales opcionales
   */
  static async proxyRequest(
    httpService: HttpService,
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    data?: unknown,
    authHeader?: string,
    additionalHeaders?: Record<string, string>,
  ): Promise<ProxyResponse> {
    const headers: Record<string, string> = {
      ...additionalHeaders,
    };

    // Propagar el JWT si existe
    if (authHeader) {
      headers['authorization'] = authHeader;
    }

    let request: Observable<AxiosResponseData>;

    switch (method) {
      case 'GET':
        request = httpService.get(url, { headers });
        break;
      case 'POST':
        request = httpService.post(url, data, { headers });
        break;
      case 'PUT':
        request = httpService.put(url, data, { headers });
        break;
      case 'PATCH':
        request = httpService.patch(url, data, { headers });
        break;
      case 'DELETE':
        request = httpService.delete(url, { headers });
        break;
      default:
        throw new Error(`Método HTTP no soportado: ${method}`);
    }

    const response = await firstValueFrom(
      request.pipe(
        catchError((error) => {
          throw error;
        }),
      ),
    );

    return {
      data: response.data,
      headers: response.headers as Record<string, unknown>,
      status: response.status,
    };
  }
}
