import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import FormData from 'form-data';
import { JwtForwardingHelper } from './jwt-forwarding.helper';

/**
 * Clase base para servicios que hacen proxy HTTP con JWT forwarding
 * Centraliza la lógica común de proxy hacia microservicios
 */
@Injectable()
export abstract class BaseProxyService {
  protected readonly logger: Logger;
  protected readonly baseServiceUrl: string;

  constructor(protected readonly httpService: HttpService) {
    this.logger = new Logger(this.constructor.name);
    this.baseServiceUrl = this.getServiceUrl();
  }

  /**
   * Método abstracto que debe ser implementado por subclases
   * para definir la URL del servicio
   */
  abstract getServiceUrl(): string;

  /**
   * Realiza una solicitud GET con JWT forwarding
   */
  protected async forwardGet(path: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.baseServiceUrl}${path}`;

    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error on GET ${url}`, error);
      throw error;
    }
  }

  /**
   * Realiza una solicitud POST con JWT forwarding
   */
  protected async forwardPost(path: string, body: any, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.baseServiceUrl}${path}`;

    try {
      this.logger.log(`Forwarding POST request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.post(url, body, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error on POST ${url}`, error);
      throw error;
    }
  }

  /**
   * Realiza una solicitud PUT con JWT forwarding
   */
  protected async forwardPut(path: string, body: any, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.baseServiceUrl}${path}`;

    try {
      this.logger.log(`Forwarding PUT request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.put(url, body, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error on PUT ${url}`, error);
      throw error;
    }
  }

  /**
   * Realiza una solicitud POST con FormData (para archivos) con JWT forwarding
   */
  protected async forwardPostFormData(
    path: string,
    file: Express.Multer.File,
    body: any,
    request: Request,
  ) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.baseServiceUrl}${path}`;

    try {
      const formData = new FormData();
      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      // Agregar los campos del body
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      // Agregar headers del FormData a la configuración
      config.headers = {
        ...config.headers,
        ...formData.getHeaders(),
      };

      this.logger.log(`Forwarding POST request with FormData to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.post(url, formData, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error on POST FormData ${url}`, error);
      throw error;
    }
  }

  /**
   * Realiza una solicitud PUT con FormData (para archivos) con JWT forwarding
   */
  protected async forwardPutFormData(
    path: string,
    file: Express.Multer.File,
    body: any,
    request: Request,
  ) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.baseServiceUrl}${path}`;

    try {
      const formData = new FormData();
      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      // Agregar los campos del body
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      // Agregar headers del FormData a la configuración
      config.headers = {
        ...config.headers,
        ...formData.getHeaders(),
      };

      this.logger.log(`Forwarding PUT request with FormData to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.put(url, formData, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error on PUT FormData ${url}`, error);
      throw error;
    }
  }

  /**
   * Descarga un archivo desde el microservicio y lo envía al cliente
   * Maneja streams para archivos grandes
   */
  protected async forwardDownload(
    path: string,
    request: Request,
    res: Response,
  ) {
    const baseConfig = JwtForwardingHelper.getAxiosConfig(request);
    const config = {
      ...baseConfig,
      responseType: 'stream' as const,
    };
    const url = `${this.baseServiceUrl}${path}`;

    try {
      this.logger.log(`Forwarding GET request (download) to: ${url}`);

      // Usar axios directamente para obtener el stream
      const response = await axios.get(url, config);

      // Propagar headers del microservicio al cliente
      if (response.headers['content-type']) {
        res.setHeader('Content-Type', response.headers['content-type']);
      }
      if (response.headers['content-disposition']) {
        res.setHeader('Content-Disposition', response.headers['content-disposition']);
      }

      // Pipear el stream al cliente
      (response.data as NodeJS.ReadableStream).pipe(res);

      // Manejar errores del stream
      (response.data as NodeJS.ReadableStream).on('error', (error: any) => {
        this.logger.error(
          `Error in download stream: ${error?.message ?? error}`,
        );
        if (!res.headersSent) {
          res.status(500).send('Error descargando el archivo');
        }
      });
    } catch (error) {
      this.logger.error(`Error downloading file from ${url}`, error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error descargando el archivo' });
      }
      throw error;
    }
  }

  /**
   * Construye una URL con query params desde un objeto
   */
  protected buildQueryString(params: any): string {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key].toString());
      }
    });
    return queryParams.toString();
  }
}
