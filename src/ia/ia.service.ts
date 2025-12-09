import { HttpService } from '@nestjs/axios';
import { Injectable, Query, HttpException, HttpStatus } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { envs } from 'src/config';

@Injectable()
export class IaService {
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

  async getRecommendations(body: any) {
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


  async chat(body: any) {
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
      console.log(`[ChatNavigation] Request received at ${new Date().toISOString()} with message: "${message}"`);

      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/api/chat/nav`, { message }),
      );

      if (!response.data || typeof response.data !== 'object' || !response.data.data || !('reply' in response.data.data)) {
        throw new HttpException(
          'Invalid response from backend: Missing reply field',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return response.data.data.reply;
    } catch (error) {
      throw new HttpException(
        `Failed to process chat navigation request: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}