import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { PdfExportService } from './pdf-export.service';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('pdf-export')
@UseGuards(JwtAuthGuard)
export class PdfExportController {
  constructor(private readonly pdfExportService: PdfExportService) {}

  /**
   * GET /pdf-export/:id/stats/export
   * Generar PDF con estadísticas del material (proxy hacia MS)
   */
  @Get(':id/stats/export')
  async exportMaterialStats(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    return this.pdfExportService.exportMaterialStats(id, request, res);
  }
}
