import { Injectable , Logger} from '@nestjs/common';
import { CreateTutoriaDto } from './dto/create-tutoria.dto';
import { UpdateTutoriaDto } from './dto/update-tutoria.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { envs } from '../config';
import type { Request } from 'express';
import { JwtForwardingHelper } from '../common/helpers';


@Injectable()
export class TutoriasService {
    private readonly logger = new Logger(TutoriasService.name);
    private readonly userManagementServiceUrl: string;
  
    constructor(private readonly httpService: HttpService) {
      let url = envs.tutoriasAzure
        ? envs.tutoriasAzure
        : `${envs.protocol}://${envs.tutoriasHost}:${envs.tutoriasPort}`;
  
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
  
      this.userManagementServiceUrl = url;
    }

    private async proxyRequest(req: Request, body?: any) {
      const path = (req.originalUrl || req.url).replace(/^\/tutorias/, '');
      const url = `${this.userManagementServiceUrl}${path}`;
      const axiosConfig = JwtForwardingHelper.getAxiosConfig(req);

      this.logger.log(`${req.method} ${url}`);

      let response$;
      const method = (req.method || 'GET').toUpperCase();
      switch (method) {
        case 'GET':
          response$ = this.httpService.get(url, axiosConfig);
          break;
        case 'POST':
          response$ = this.httpService.post(url, body, axiosConfig);
          break;
        case 'PATCH':
          response$ = this.httpService.patch(url, body, axiosConfig);
          break;
        case 'DELETE':
          response$ = this.httpService.delete(url, { ...axiosConfig, data: body });
          break;
        default:
          response$ = this.httpService.request({ url, method, ...axiosConfig, data: body });
      }

      const response: any = await firstValueFrom(response$ as any);
      return response.data;
    }

    async findById(id: string, req: Request) {
      return this.proxyRequest(req);
    }

    async findByEmail(email: string, req: Request) {
      return this.proxyRequest(req);
    }

    async updateAvailabilityById(id: string, disponibilidad: any, req: Request) {
      return this.proxyRequest(req, { disponibilidad });
    }

    async updateAvailabilityByEmail(email: string, disponibilidad: any, req: Request) {
      return this.proxyRequest(req, { disponibilidad });
    }

    async getAvailabilityById(id: string, req: Request) {
      return this.proxyRequest(req);
    }

    async getAvailabilityByEmail(email: string, req: Request) {
      return this.proxyRequest(req);
    }

    async findEstudiantes(req: Request) {
      return this.proxyRequest(req);
    }

    async findTutores(req: Request) {
      return this.proxyRequest(req);
    }

    async create(createTutoriaDto: CreateTutoriaDto, req: Request) {
      return this.proxyRequest(req, createTutoriaDto);
    }

    async getTutorsByMateria(codigo: string, req: Request) {
      return this.proxyRequest(req);
    }

    async getTutorRatings(id: string, req: Request) {
      return this.proxyRequest(req);
    }

    async getTutorReputacion(id: string, req: Request) {
      return this.proxyRequest(req);
    }

    async getTutorMaterias(id: string, req: Request) {
      return this.proxyRequest(req);
    }

    async addMaterias(id: string, addMateriasDto: any, req: Request) {
      return this.proxyRequest(req, addMateriasDto);
    }

    async removeMaterias(id: string, removeMateriasDto: any, req: Request) {
      return this.proxyRequest(req, removeMateriasDto);
    }

    async getSystemOverview(req: Request) {
      return this.proxyRequest(req);
    }

    async getPopularSubjects(limit: number, req: Request) {
      return this.proxyRequest(req);
    }

    async createSession(createSessionDto: any, req: Request) {
      return this.proxyRequest(req, createSessionDto);
    }

    async findSessionById(id: string, req: Request) {
      return this.proxyRequest(req);
    }

    async findByStudent(studentId: string, req: Request) {
      return this.proxyRequest(req);
    }

    async findByTutor(tutorId: string, req: Request) {
      return this.proxyRequest(req);
    }

    async confirmSession(sessionId: string, tutorId: string, req: Request) {
      return this.proxyRequest(req, { tutorId });
    }

    async rejectSession(sessionId: string, tutorId: string, rejectDto: any, req: Request) {
      return this.proxyRequest(req, rejectDto);
    }

    async cancelSession(sessionId: string, userId: string, cancelDto: any, req: Request) {
      return this.proxyRequest(req, cancelDto);
    }

    async completeSession(sessionId: string, tutorId: string, completeDto: any, req: Request) {
      return this.proxyRequest(req, completeDto);
    }

    async createRating(createRatingDto: any, req: Request) {
      return this.proxyRequest(req, createRatingDto);
    }

    async findRatingsByTutor(tutorId: string, req: Request) {
      return this.proxyRequest(req);
    }

    async findRatingsBySession(sessionId: string, req: Request) {
      return this.proxyRequest(req);
    }
}

