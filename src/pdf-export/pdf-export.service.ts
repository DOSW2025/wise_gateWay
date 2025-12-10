import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { ProxyServiceHelper } from 'src/common/helpers';
import { envs } from 'src/config';

@Injectable()
export class PdfExportService extends ProxyServiceHelper {
  constructor(httpService: HttpService) {
    const baseUrl = envs.materialesAzure || '';
    super(`${PdfExportService.name}`, baseUrl, httpService);
  }

  /**
   * GET /pdf-export/:id/stats/export (gateway)
   * → proxy hacia MS materiales
   */
  async exportMaterialStats(id: string, request: Request, res: Response) {
    return this.proxyStreamResponse(`/pdf-export/${id}/stats/export`, request, res);
  }
}