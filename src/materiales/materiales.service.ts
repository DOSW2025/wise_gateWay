import { Injectable, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { envs } from 'src/config';
import { JwtForwardingHelper } from 'src/common/helpers';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';


@Injectable()
export class MaterialesService {
  private readonly logger = new Logger(MaterialesService.name);
  private readonly materialesServiceUrl: string;

  constructor(private readonly httpService: HttpService) {
    let url = envs.materialesAzure;

    if (!url) {
      throw new Error('MATERIALES_AZURE environment variable is required');
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    this.materialesServiceUrl = url + '/material';
  }

  /**
   * Preparar FormData con archivo y campos adicionales
   */
  private prepareFormDataWithFile(file: Express.Multer.File, body: any, config: any) {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    // Agregar los campos del body
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });

    // Agregar headers del FormData a la configuración
    config.headers = {
      ...config.headers,
      ...formData.getHeaders(),
    };

    return formData;
  }

  /**
   * Subir un nuevo material
   */
  async subirNuevoMaterial(file: Express.Multer.File, body: any, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.materialesServiceUrl}`;

    try {
      const formData = this.prepareFormDataWithFile(file, body, config);

      this.logger.log(`Forwarding POST request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.post(url, formData, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error uploading material`, error);
      throw error;
    }
  }

  /**
   * Obtener materiales de un usuario
   */
  async getMaterialsByUser(userId: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.materialesServiceUrl}/user/${userId}`;

    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error getting materials by user`, error);
      throw error;
    }
  }

  /**
   * Obtener materiales populares
   */
  async getPopularMaterials(limit: number, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.materialesServiceUrl}/stats/popular?limit=${limit}`;

    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error getting popular materials`, error);
      throw error;
    }
  }

  /**
   * Calificar un material
   */
  async rateMaterial(materialId: string, body: any, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.materialesServiceUrl}/${materialId}/ratings`;

    try {
      this.logger.log(`Forwarding POST request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.post(url, body, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error rating material`, error);
      throw error;
    }
  }

  /**
   * Obtener calificaciones de un material
   */
  async getMaterialRatings(materialId: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.materialesServiceUrl}/${materialId}/ratings`;

    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error getting material ratings`, error);
      throw error;
    }
  }

  /**
   * Buscar materiales con filtros
   */
  async searchMaterials(filters: any, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    
    // Construir query params
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        queryParams.append(key, filters[key].toString());
      }
    });

    const url = `${this.materialesServiceUrl}/filter?${queryParams.toString()}`;

    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error searching materials`, error);
      throw error;
    }
  }

  /**
   * Obtener información detallada de un material
   */
  async getMaterialDetail(id: string, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.materialesServiceUrl}/${id}`;

  try {
    this.logger.log(`Forwarding GET request to: ${url}`);
    const response = await firstValueFrom(
      this.httpService.get(url, config),
    );
    return response.data;
  } catch (error) {
    this.logger.error(`Error getting material detail`, error);
    throw error;
  }
  }


  /**
   * Descargar material
   */
  async downloadMaterial(materialId: string, res: Response, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    
    const url = `${this.materialesServiceUrl}/${materialId}/download`;

    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );

      // Propagar headers del microservicio al cliente
      if (response.headers['content-type']) {
        res.setHeader('Content-Type', response.headers['content-type']);
      }
      if (response.headers['content-disposition']) {
        res.setHeader('Content-Disposition', response.headers['content-disposition']);
      }

      // Pipear el stream al cliente
      response.data.pipe(res);
    } catch (error) {
      this.logger.error(`Error downloading material`, error);
      throw error;
    }
  }

  /**
   * Autocompletar materiales
   */
  async autocompleteMaterials(query: any, request: Request) {
    const config = JwtForwardingHelper.getAxiosConfig(request);
    
    // Construir query params
    const queryParams = new URLSearchParams();
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined && query[key] !== null && query[key] !== '') {
        queryParams.append(key, query[key].toString());
      }
    });

    const url = `${this.materialesServiceUrl}/autocomplete?${queryParams.toString()}`;

    try {
      this.logger.log(`Forwarding GET request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.get(url, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error autocompleting materials`, error);
      throw error;
    }
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
    const config = JwtForwardingHelper.getAxiosConfig(request);
    const url = `${this.materialesServiceUrl}/${materialId}`;

    try {
      const formData = this.prepareFormDataWithFile(file, body, config);

      this.logger.log(`Forwarding PUT request to: ${url}`);
      const response = await firstValueFrom(
        this.httpService.put(url, formData, config),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error updating material version`, error);
      throw error;
    }
  }
}