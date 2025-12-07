import { HttpService } from '@nestjs/axios';
import { Injectable, Query } from '@nestjs/common';
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
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/swagger.json`),
    );
    return response.data;
  }

  async getHealthStatus() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/health`),
    );
    return response.data;
  }

  async simulateAnalysis(body: any) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/analyze`, body),
    );
    return response.data;
  }

  async getRecommendations(body: any) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/recommendations`, body),
    );
    return response.data;
  }

  async simulateSave(body: any) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/save`, body),
    );
    return response.data;
  }

  async chat(body: any) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/chat`, body),
    );
    return response.data;
  }
}