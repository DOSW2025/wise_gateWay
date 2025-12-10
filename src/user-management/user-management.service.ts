import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { envs } from '../config';
import type { Request } from 'express';
import { JwtForwardingHelper } from '../common/helpers';
import { FilterUsersDto, ChangeRoleDto, ChangeStatusDto, UpdatePersonalInfoDto, UserGrowthDto } from './dto';

@Injectable()
export class UserManagementService {
  private readonly logger = new Logger(UserManagementService.name);
  private readonly userManagementServiceUrl: string;

  constructor(private readonly httpService: HttpService) {
    let url = envs.userManagementAzure
      ? envs.userManagementAzure
      : `${envs.protocol}://${envs.userManagementHost}:${envs.userManagementPort}`;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    this.userManagementServiceUrl = url.replace(/\/$/, '');
  }

  async findAllWithFilters(filterUsersDto: FilterUsersDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userManagementServiceUrl}/gestion-usuarios`;

    try {
      this.logger.log(`Forwarding request with filters to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, {
          ...config,
          params: filterUsersDto,
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error forwarding filtered request to user management service`, error);
      throw error;
    }
  }

  async changeRole(id: string, changeRoleDto: ChangeRoleDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userManagementServiceUrl}/gestion-usuarios/${id}/rol`;

    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, changeRoleDto, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error changing user role`, error);
      throw error;
    }
  }

  async changeStatus(id: string, changeStatusDto: ChangeStatusDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userManagementServiceUrl}/gestion-usuarios/${id}/estado`;

    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, changeStatusDto, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error changing user status`, error);
      throw error;
    }
  }

  async updateMyPersonalInfo(updatePersonalInfoDto: UpdatePersonalInfoDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userManagementServiceUrl}/gestion-usuarios/me/info-personal`;

    try {
      this.logger.log(`Forwarding PATCH request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.patch(url, updatePersonalInfoDto, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error updating personal info`, error);
      throw error;
    }
  }

  async deleteUserByAdmin(id: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userManagementServiceUrl}/gestion-usuarios/${id}`;

    try {
      this.logger.log(`Forwarding DELETE request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.delete(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error deleting user`, error);
      throw error;
    }
  }

  async deleteMyAccount(request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userManagementServiceUrl}/gestion-usuarios/me/cuenta`;

    try {
      this.logger.log(`Forwarding DELETE request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.delete(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error deleting own account`, error);
      throw error;
    }
  }
  async getUserStatistics(request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userManagementServiceUrl}/gestion-usuarios/estadisticas/usuarios`;
    try {
      this.logger.log(`Forwarding DELETE request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error calculating stats`, error);
      throw error;
    }
  }

  async getRoleStatistics(request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userManagementServiceUrl}/gestion-usuarios/estadisticas/roles`;
    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error calculating role statistics`, error);
      throw error;
    }
  }

  async getUserGrowth(userGrowthDto: UserGrowthDto, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.userManagementServiceUrl}/gestion-usuarios/estadisticas/crecimiento`;
    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, {
          ...config,
          params: userGrowthDto,
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error getting user growth statistics`, error);
      throw error;
    }
  }
}
