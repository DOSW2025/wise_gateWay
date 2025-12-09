import { Controller, Get, Post, Body, HttpStatus, ValidationPipe } from '@nestjs/common';
import { IaService } from './ia.service';
import { Logger } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { RecommendationsDto } from './dto/recommendations.dto';
import { ChatNavigationDto } from './dto/chat-navigation.dto';

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

  @Post('chat')
  async chat(@Body(new ValidationPipe()) body: ChatDto) {
    return this.iaService.chat(body);
  }

  @Post('chat/recommendations')
  async getRecommendations(@Body(new ValidationPipe()) body: RecommendationsDto) {
    return this.iaService.getRecommendations(body);
  }

  @Post('chat/nav')
  async chatNavigation(@Body(new ValidationPipe()) chatNavigationDto: ChatNavigationDto) {
    const { message } = chatNavigationDto;
    const reply = await this.iaService.chatNavigation(message);
    return {
      success: true,
      data: { reply },
    };
  }
}