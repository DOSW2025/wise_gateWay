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

  async simulateAnalysis(body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/analyze`, body),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to simulate analysis: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getRecommendations(body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/recommendations`, body),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch recommendations: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async simulateSave(body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/save`, body),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to simulate save: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async chat(body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/chat`, body),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to process chat request: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}