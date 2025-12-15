import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { IaService } from './ia.service';
import { FeatureFlag } from '../common/decorators/feature-flag.decorator';
import { ChatDto } from './dto/chat.dto';
import { RecommendationsRequestDto } from './dto/recommendations-request.dto';
import { ChatNavigationDto } from './dto/chat-navigation.dto';

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
  @FeatureFlag('enable_ia_chat')
  async chat(@Body(new ValidationPipe()) body: ChatDto) {
    return this.iaService.chat(body);
  }

  @Post('chat/recommendations')
  @FeatureFlag('enable_ia_chat')
  async getRecommendations(
    @Body(new ValidationPipe()) body: RecommendationsRequestDto,
  ) {
    return this.iaService.getRecommendations(body);
  }

  @Post('chat/nav')
  @FeatureFlag('enable_ia_chat')
  async chatNavigation(
    @Body(new ValidationPipe()) chatNavigationDto: ChatNavigationDto,
  ) {
    const { message } = chatNavigationDto;
    const reply = await this.iaService.chatNavigation(message);
    return {
      success: true,
      data: { reply },
    };
  }
}
