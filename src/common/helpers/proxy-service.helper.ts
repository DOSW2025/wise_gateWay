import { Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JwtForwardingHelper } from './jwt-forwarding.helper';
import axios from 'axios';
import FormData from 'form-data';

/**
 * Helper base para servicios de proxy
 * Centraliza la lógica común de comunicación con microservicios
 */
export class ProxyServiceHelper {
  protected readonly logger: Logger;
  protected readonly baseUrl: string;

  constructor(
    loggerName: string,
    baseServiceUrl: string,
    protected readonly httpService: HttpService,
  ) {
    this.logger = new Logger(loggerName);
    this.baseUrl = this.normalizeUrl(baseServiceUrl);
  }

  /**
   * Normaliza y valida URLs
   */
  protected normalizeUrl(url: string): string {
    if (!url) {
      throw new Error('Base service URL is required');
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    return url;
  }

  /**
   * GET request con proxy
   */
  async proxyGet<T = any>(
    endpoint: string,
    request: Request,
    options?: { stream?: boolean },
  ): Promise<T> {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    
    if (options?.stream) {
      (config as any).responseType = 'stream';
    }

    const url = `${this.baseUrl}${endpoint}`;

    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      
      const response = options?.stream
        ? await axios.get(url, config as any)
        : await firstValueFrom(this.httpService.get(url, config));

      return response.data;
    } catch (error) {
      this.logger.error(`Error in GET request to ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * POST request con proxy
   */
  async proxyPost<T = any>(
    endpoint: string,
    data: any,
    request: Request,
  ): Promise<T> {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.baseUrl}${endpoint}`;

    try {
      this.logger.log(`Forwarding POST request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.post(url, data, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error in POST request to ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * POST request con FormData (para subida de archivos)
   */
  async proxyPostFormData<T = any>(
    endpoint: string,
    file: Express.Multer.File,
    body: any,
    request: Request,
  ): Promise<T> {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.baseUrl}${endpoint}`;

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

      config.headers = {
        ...config.headers,
        ...formData.getHeaders(),
      };

      this.logger.log(`Forwarding POST request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.post(url, formData, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error in POST request to ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * PUT request con proxy
   */
  async proxyPut<T = any>(
    endpoint: string,
    data: any,
    request: Request,
  ): Promise<T> {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.baseUrl}${endpoint}`;

    try {
      this.logger.log(`Forwarding PUT request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.put(url, data, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error in PUT request to ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * PUT request con FormData (para actualización de archivos)
   */
  async proxyPutFormData<T = any>(
    endpoint: string,
    file: Express.Multer.File,
    body: any,
    request: Request,
  ): Promise<T> {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const formData = new FormData();
      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      config.headers = {
        ...config.headers,
        ...formData.getHeaders(),
      };

      this.logger.log(`Forwarding PUT request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.put(url, formData, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error in PUT request to ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Stream response directamente al cliente (para descargas/exportaciones)
   */
  async proxyStreamResponse(
    endpoint: string,
    request: Request,
    res: Response,
  ): Promise<void> {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    (config as any).responseType = 'stream';

    const url = `${this.baseUrl}${endpoint}`;

    try {
      this.logger.log(`Forwarding GET stream request to: ${url}`);
      const response = await axios.get(url, config as any);

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
        this.logger.error(`Error in stream: ${error?.message ?? error}`);
        if (!res.headersSent) {
          res.status(500).send('Error procesando el archivo');
        }
      });
    } catch (error) {
      this.logger.error(`Error streaming from ${endpoint}`, error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error procesando el archivo' });
      }
      throw error;
    }
  }

  /**
   * Construir query params a partir de un objeto
   */
  protected buildQueryParams(params: Record<string, any>): string {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key].toString());
      }
    });
    return queryParams.toString();
  }
}

