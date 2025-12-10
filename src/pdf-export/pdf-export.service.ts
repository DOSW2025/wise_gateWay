import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { BaseProxyService } from 'src/common/helpers';
import { envs } from 'src/config';

@Injectable()
export class PdfExportService extends BaseProxyService {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  getServiceUrl(): string {
    let url = envs.materialesAzure;

    if (!url) throw new Error('MATERIALES_AZURE environment variable is required');
    if (!url.startsWith('http')) url = `https://${url}`;

    return url + '/pdf-export';
  }

  /**
   * GET /pdf-export/:id/stats/export (gateway)
   * → proxy hacia MS materiales
   */
  async exportMaterialStats(id: string, request: Request, res: Response) {
    return this.forwardDownload(`/${id}/stats/export`, request, res);
  }
}