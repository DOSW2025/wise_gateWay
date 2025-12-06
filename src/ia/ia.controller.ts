import { Controller, Get, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { IaService } from './ia.service';
import type { Request, Response } from 'express';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get('swagger.json')
  async getSwaggerJson(@Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.iaService.getSwaggerJson();
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  @Get('health')
  async getHealth(@Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.iaService.getHealthStatus();
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  @Get('version')
  async getVersion(@Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.iaService.getVersion();
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  @Get()
  async getRootInfo(@Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.iaService.getRootInfo();
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  @Post('simulation/analysis')
  async simulateAnalysis(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.iaService.simulateAnalysis(body);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  @Post('simulation/save')
  async simulateSave(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.iaService.simulateSave(body);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  @Post('chat')
  async chat(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.iaService.chat(body);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  @Post('chat/recommendations')
  async getRecommendations(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.iaService.getRecommendations(body);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  @Post('chat/nav')
  async navigateChat(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.iaService.navigateChat(body);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }
}