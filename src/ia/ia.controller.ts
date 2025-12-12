import { Controller, Get, Post, Body, ValidationPipe, Logger } from '@nestjs/common';
<<<<<<< HEAD
=======
import { SkipThrottle } from '@nestjs/throttler';
>>>>>>> d6de4806ce4bffaeeaac798538a1dd12547431f9
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

<<<<<<< HEAD
=======
  @SkipThrottle()
>>>>>>> d6de4806ce4bffaeeaac798538a1dd12547431f9
  @Get('swagger.json')
  async getSwaggerJson() {
    return this.iaService.getSwaggerJson();
  }

<<<<<<< HEAD
=======
  @SkipThrottle()
>>>>>>> d6de4806ce4bffaeeaac798538a1dd12547431f9
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