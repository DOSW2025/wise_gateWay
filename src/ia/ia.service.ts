import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { envs } from 'src/config';
import { RecommendationsRequestDto } from 'src/ia/dto/recommendations-request.dto';
import { ChatRequestDto } from 'src/ia/dto/chat-request.dto';

@Injectable()
export class IaService {
  private readonly logger = new Logger(IaService.name);
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
   let url = envs.iaAzure;
   
       if (!url) {
         throw new Error('IA_AZURE environment variable is required');
       }
   
       if (!url.startsWith('http://') && !url.startsWith('https://')) {
         url = `https://${url}`;
       }
   
       this.baseUrl = url;

  }

  async getSwaggerJson() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/swagger.json`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch Swagger JSON: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getHealthStatus() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/health`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch health status: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getRecommendations(body: RecommendationsRequestDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/api/chat/recommendations`, body),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch recommendations: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async chat(body: ChatRequestDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/api/chat`, body),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to process chat request: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async chatNavigation(message: string) {
    try {
      this.logger.log(`Request received with message: "${message}"`);

      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/api/chat/nav`, { message }),
      );

      if (!response.data) {
        throw new HttpException(
          'Invalid response from backend: Missing "data" field in response',
          HttpStatus.BAD_GATEWAY,
        );
      }
      if (typeof response.data !== 'object') {
        throw new HttpException(
          'Invalid response from backend: "data" field is not an object',
          HttpStatus.BAD_GATEWAY,
        );
      }
      if (!response.data.data) {
        throw new HttpException(
          'Invalid response from backend: Missing "data.data" field in response',
          HttpStatus.BAD_GATEWAY,
        );
      }
      if (!('reply' in response.data.data)) {
        throw new HttpException(
          'Invalid response from backend: Missing "reply" field in data.data',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return response.data.data.reply;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error in chatNavigation: ${error.message}`);
      throw new HttpException(
        `Failed to process chat navigation request: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}