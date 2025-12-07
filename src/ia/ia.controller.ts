import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { IaService } from './ia.service';
import { Logger } from '@nestjs/common';

@Controller('ia')
export class IaController {
  private readonly logger = new Logger(IaController.name);

  constructor(private readonly iaService: IaService) {
     this.logger.log('IaController initialized');
  }

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
      console.log('Chat endpoint hit with body:', body); // Agrega este log
    return this.iaService.chat(body);
  }

  @Post('chat/recommendations')
  async getRecommendations(@Body() body: any) {
    return this.iaService.getRecommendations(body);
  }
}