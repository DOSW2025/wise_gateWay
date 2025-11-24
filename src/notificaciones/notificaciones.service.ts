import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { HttpService } from '@nestjs/axios';
import { envs } from 'src/config';
import { JwtForwardingHelper } from 'src/common/helpers';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificacionesService {
  private readonly logger = new Logger(NotificacionesService.name);
  private readonly userNotifyService: string;


  constructor(private readonly httpService: HttpService) {
    let url = envs.userManagementAzure
      ? envs.userManagementAzure
      : `${envs.protocol}://${envs.userNotify}:${envs.userNotifyPort}`;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    this.userNotifyService = url;
  }


  async usernotify(userid: string, createNotificacioneDto: CreateNotificacioneDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/notificacion/${userid}`;
    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, createNotificacioneDto, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }

  async notifyUnread(userid: string, createNotificacioneDto: CreateNotificacioneDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/notificacion/unread-count/${userid}`;
    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, createNotificacioneDto, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }

  async notifyDelete(id: string, createNotificacioneDto: CreateNotificacioneDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/notificacion/${id}`;
    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, createNotificacioneDto, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }

  async allnotifyRead(userid: string, createNotificacioneDto: CreateNotificacioneDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/notificacion/read-all/${userid}`;
    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, createNotificacioneDto, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }

  async notifyRead(id: string, createNotificacioneDto: CreateNotificacioneDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/notificacion/read/${id}`;
    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, createNotificacioneDto, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }
}
