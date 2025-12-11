import { Controller, Get, Post, Body, ValidationPipe, Logger } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { IaService } from './ia.service';
import { ChatDto } from './dto/chat.dto';
import { RecommendationsRequestDto } from './dto/recommendations-request.dto';
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

  @Throttle({ short: { limit: 60, ttl: 60000 } })
  @Post('chat')
  async chat(@Body(new ValidationPipe()) body: ChatDto) {
    return this.iaService.chat(body);
  }

  @Throttle({ short: { limit: 60, ttl: 60000 } })
  @Post('chat/recommendations')
  async getRecommendations(@Body(new ValidationPipe()) body: RecommendationsRequestDto) {
    return this.iaService.getRecommendations(body);
  }

  @Throttle({ short: { limit: 60, ttl: 60000 } })
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