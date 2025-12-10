import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { envs } from 'src/config';
import { BaseProxyService } from 'src/common/helpers';

@Injectable()
export class MaterialesService extends BaseProxyService {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  getServiceUrl(): string {
    let url = envs.materialesAzure;

    if (!url) {
      throw new Error('MATERIALES_AZURE environment variable is required');
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    return url + '/material';
  }

  /**
   * Subir un nuevo material
   */
  async subirNuevoMaterial(file: Express.Multer.File, body: any, request: Request) {
    return this.forwardPostFormData('', file, body, request);
  }

  /**
   * Obtener materiales de un usuario
   */
  async getMaterialsByUser(userId: string, request: Request) {
    return this.forwardGet(`/user/${userId}`, request);
  }

  /**
   * Obtener materiales populares
   */
  async getPopularMaterials(limit: number, request: Request) {
    return this.forwardGet(`/stats/popular?limit=${limit}`, request);
  }

  /**
   * Calificar un material
   */
  async rateMaterial(materialId: string, body: any, request: Request) {
    return this.forwardPost(`/${materialId}/ratings`, body, request);
  }

  /**
   * Obtener calificaciones de un material
   */
  async getMaterialRatings(materialId: string, request: Request) {
    return this.forwardGet(`/${materialId}/ratings`, request);
  }

  /**
   * Buscar materiales con filtros
   */
  async searchMaterials(filters: any, request: Request) {
    const queryString = this.buildQueryString(filters);
    const path = `/filter${queryString ? '?' + queryString : ''}`;
    return this.forwardGet(path, request);
  }

  /**
   * Obtener información detallada de un material
   */
  async getMaterialDetail(id: string, request: Request) {
    return this.forwardGet(`/${id}`, request);
  }

  /**
   * Descargar material
   */
  async downloadMaterial(materialId: string, res: Response, request: Request) {
    return this.forwardDownload(`/${materialId}/download`, request, res);
  }

  /**
   * Autocompletar materiales
   */
  async autocompleteMaterials(query: any, request: Request) {
    const queryString = this.buildQueryString(query);
    const path = `/autocomplete${queryString ? '?' + queryString : ''}`;
    return this.forwardGet(path, request);
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
    return this.forwardPutFormData(`/${materialId}`, file, body, request);
  }
}