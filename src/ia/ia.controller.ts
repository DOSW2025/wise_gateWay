import { Controller, Get, Post, Body, HttpStatus, ValidationPipe } from '@nestjs/common';
import { IaService } from './ia.service';
import { Logger } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { SimulateAnalysisDto } from './dto/simulate-analysis.dto';
import { SimulateSaveDto } from './dto/simulate-save.dto';
import { RecommendationsDto } from './dto/recommendations.dto';

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
  async simulateAnalysis(@Body(new ValidationPipe()) body: SimulateAnalysisDto) {
    return this.iaService.simulateAnalysis(body);
  }

  @Post('simulation/save')
  async simulateSave(@Body(new ValidationPipe()) body: SimulateSaveDto) {
    return this.iaService.simulateSave(body);
  }

  @Post('chat')
  async chat(@Body(new ValidationPipe()) body: ChatDto) {
    console.log('Chat endpoint hit with body:', body);
    return this.iaService.chat(body);
  }

  @Post('chat/recommendations')
  async getRecommendations(@Body(new ValidationPipe()) body: RecommendationsDto) {
    return this.iaService.getRecommendations(body);
  }
}