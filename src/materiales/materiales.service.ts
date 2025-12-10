import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { envs } from 'src/config';
import { ProxyServiceHelper } from 'src/common/helpers';

@Injectable()
export class MaterialesService extends ProxyServiceHelper {
  constructor(httpService: HttpService) {
    const baseUrl = envs.materialesAzure || '';
    super(`${MaterialesService.name}`, baseUrl, httpService);
  }

  /**
   * Subir un nuevo material
   */
  async subirNuevoMaterial(file: Express.Multer.File, body: any, request: Request) {
    return this.proxyPostFormData('/material', file, body, request);
  }

  /**
   * Obtener materiales de un usuario
   */
  async getMaterialsByUser(userId: string, request: Request) {
    return this.proxyGet(`/material/user/${userId}`, request);
  }

  /**
   * Obtener materiales populares
   */
  async getPopularMaterials(limit: number, request: Request) {
    return this.proxyGet(`/material/stats/popular?limit=${limit}`, request);
  }

  /**
   * Calificar un material
   */
  async rateMaterial(materialId: string, body: any, request: Request) {
    return this.proxyPost(`/material/${materialId}/ratings`, body, request);
  }

  /**
   * Obtener calificaciones de un material
   */
  async getMaterialRatings(materialId: string, request: Request) {
    return this.proxyGet(`/material/${materialId}/ratings`, request);
  }

  /**
   * Buscar materiales con filtros
   */
  async searchMaterials(filters: any, request: Request) {
    const queryParams = this.buildQueryParams(filters);
    return this.proxyGet(`/material/filter?${queryParams}`, request);
  }

  /**
   * Obtener información detallada de un material
   */
  async getMaterialDetail(id: string, request: Request) {
    return this.proxyGet(`/material/${id}`, request);
  }


  /**
   * Descargar material
   */
  async downloadMaterial(materialId: string, res: Response, request: Request) {
    return this.proxyStreamResponse(`/material/${materialId}/download`, request, res);
  }

  /**
   * Autocompletar materiales
   */
  async autocompleteMaterials(query: any, request: Request) {
    const queryParams = this.buildQueryParams(query);
    return this.proxyGet(`/material/autocomplete?${queryParams}`, request);
  }

  /**
   * Actualizar versión de material
   */
  async actualizarMaterialVersion(
    materialId: string,
    file: Express.Multer.File,
    body: any,
    request: Request,
  ) {
    return this.proxyPutFormData(`/material/${materialId}`, file, body, request);
  }
}