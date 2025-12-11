import { Controller, Get, Post, Body, ValidationPipe, Logger } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { IaService } from './ia.service';
import { ChatDto } from './dto/chat.dto';
import { RecommendationsRequestDto } from './dto/recommendations-request.dto';
import { ChatNavigationDto } from './dto/chat-navigation.dto';

/**
 * Configuración de rate limiting para endpoints de chat.
 * Límite: 60 solicitudes por minuto.
 */
const CHAT_THROTTLE_CONFIG = { short: { limit: 60, ttl: 60000 } };

@Throttle(CHAT_THROTTLE_CONFIG)
@Controller('ia')
export class IaController {
  private readonly logger = new Logger(IaController.name);

  constructor(private readonly iaService: IaService) {
     this.logger.log('IaController initialized');
  }

  @SkipThrottle()
  @Get('swagger.json')
  async getSwaggerJson() {
    return this.iaService.getSwaggerJson();
  }

  @SkipThrottle()
  @Get('health')
  async getHealth() {
    return this.iaService.getHealthStatus();
  }

  @Post('chat')
  async chat(@Body(new ValidationPipe()) body: ChatDto) {
    return this.iaService.chat(body);
  }

  @Post('chat/recommendations')
  async getRecommendations(@Body(new ValidationPipe()) body: RecommendationsRequestDto) {
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