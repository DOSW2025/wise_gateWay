import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IaService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    // Use environment variables to configure the base URL
    const host = process.env.IA_HOST || 'localhost';
    const port = process.env.IA_PORT || '3004';
    this.baseUrl = `http://${host}:${port}`;
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