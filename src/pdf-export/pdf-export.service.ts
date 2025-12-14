import { Injectable, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { JwtForwardingHelper } from 'src/common/helpers';
import { envs } from 'src/config';
import axios from 'axios';

@Injectable()
export class PdfExportService {
  private readonly logger = new Logger(PdfExportService.name);
  private readonly materialesServiceUrl: string;

  constructor(private readonly httpService: HttpService) {
    let url = envs.materialesAzure;

    if (!url) throw new Error('MATERIALES_AZURE environment variable is required');
    if (!url.startsWith('http')) url = `https://${url}`;

    this.materialesServiceUrl = url + '/pdf-export';
  }

  /**
   * GET /pdf-export/:id/stats/export (gateway)
   * → proxy hacia MS materiales
   */
  async exportMaterialStats(id: string, request: Request, res: Response) {
    const baseConfig = JwtForwardingHelper.getAxiosConfig(request);
    const config = {
      ...baseConfig,
      responseType: 'stream' as const,
    };

    const url = `${this.materialesServiceUrl}/${id}/stats/export`;

    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
  
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
        this.logger.error(`Error in stream: ${error?.message ?? error}`);
        if (!res.headersSent) {
          res.status(500).send('Error descargando el archivo');
        }
      });
    } catch (error) {
      this.logger.error(`Error downloading material`, error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error descargando el archivo' });
      }
      throw error;
    }
  }
}
