import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { envs } from 'src/config';
import { JwtForwardingHelper } from 'src/common/helpers';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificacionesService {
  private readonly logger = new Logger(NotificacionesService.name);
  private readonly userNotifyService: string;

  constructor(private readonly httpService: HttpService) {
    let url = envs.notificacionesAzure;

    if (!url) {
      throw new Error('NOTIFICACIONES_AZURE environment variable is required');
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    this.userNotifyService = url;
  }


  async usernotify(userid: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/${userid}`;
    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(this.httpService.get(url, config));
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }

  async notifyUnread(userid: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/unread-count/${userid}`;
    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(this.httpService.get(url, config));
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }

  async unreadChatCount(userid: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/unread-chat-count/${userid}`;
    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error getting unread chat count`, error);
      throw error;
    }
  }

  async notifyDelete(id: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/${id}`;
    try {
      this.logger.log(`Forwarding DELETE request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.delete(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }

  async allnotifyRead(userid: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/read-all/${userid}`;
    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, {}, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }

  async notifyRead(id: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userNotifyService}/read/${id}`;
    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, {}, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error with user notify consult`, error);
      throw error;
    }
  }
}
