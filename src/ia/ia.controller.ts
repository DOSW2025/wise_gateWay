import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get('swagger.json')
  async getSwaggerJson() {
    return this.iaService.getSwaggerJson();
  }

  @Get('health')
  async getHealth() {
    return this.iaService.getHealthStatus();
  }

  @Post('simulation/analysis')
  async simulateAnalysis(@Body() body: any) {
    return this.iaService.simulateAnalysis(body);
  }

  @Post('simulation/save')
  async simulateSave(@Body() body: any) {
    return this.iaService.simulateSave(body);
  }

  @Post('chat')
  async chat(@Body() body: any) {
    return this.iaService.chat(body);
  }

  @Post('chat/recommendations')
  async getRecommendations(@Body() body: any) {
    return this.iaService.getRecommendations(body);
  }
}