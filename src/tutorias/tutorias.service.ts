import { Injectable , Logger} from '@nestjs/common';
import { CreateTutoriaDto } from './dto/create-tutoria.dto';
import { UpdateTutoriaDto } from './dto/update-tutoria.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { envs } from '../config';
import type { Request } from 'express';
import { JwtForwardingHelper } from '../common/helpers';
import { CreateSessionDto } from './dto';


@Injectable()
export class TutoriasService {
    private readonly logger = new Logger(TutoriasService.name);
    private readonly tutoriasManagementServiceUrl: string;
  
    constructor(private readonly httpService: HttpService) {
      let url = envs.tutoriasAzure
        ? envs.tutoriasAzure
        : `${envs.protocol}://${envs.tutoriasHost}:${envs.tutoriasPort}`;
  
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
  
      this.tutoriasManagementServiceUrl = url;
    }



    async updateAvailabilityById(id: string, disponibilidad: any, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/users/id/${id}/availability`;
      try {
        this.logger.log(`Forwarding PATCH request to: ${url}`);
        const response = await firstValueFrom(this.httpService.patch(url, { disponibilidad }, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding PATCH users/id availability`, error);
        throw error;
      }
    }

    async updateAvailabilityByEmail(email: string, disponibilidad: any, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/users/email/${email}/availability`;
      try {
        this.logger.log(`Forwarding PATCH request to: ${url}`);
        const response = await firstValueFrom(this.httpService.patch(url, { disponibilidad }, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding PATCH users/email availability`, error);
        throw error;
      }
    }

    async getAvailabilityById(id: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
      const url = `${this.tutoriasManagementServiceUrl}/users/disponibilidad/id/${id}'`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET users/id availability`, error);
        throw error;
      }
    }

    async getAvailabilityByEmail(email: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
      const url = `${this.tutoriasManagementServiceUrl}/users/disponibilidad/email/${email}`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET users/email availability`, error);
        throw error;
      }
    }


    async findTutores(req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/users/tutores`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET users/tutores`, error);
        throw error;
      }
    }

    async create(createTutoriaDto: CreateTutoriaDto, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/tutores`;
      try {
        this.logger.log(`Forwarding POST request to: ${url}`);
        const response = await firstValueFrom(this.httpService.post(url, createTutoriaDto, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding POST tutores`, error);
        throw error;
      }
    }

    async getTutorsByMateria(codigo: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
      const url = `${this.tutoriasManagementServiceUrl}/tutors/by-materia/${codigo}`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET tutores by-materia`, error);
        throw error;
      }
    }

    async getTutorRatings(id: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/tutors/${id}/ratings`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET tutores ratings`, error);
        throw error;
      }
    }

    async getTutorReputacion(id: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/tutors/${id}/reputacion`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET tutores reputacion`, error);
        throw error;
      }
    }

    async getTutorMaterias(id: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/tutors/${id}/materias`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET tutores materias`, error);
        throw error;
      }
    }

    async addMaterias(id: string, addMateriasDto: any, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
      const url = `${this.tutoriasManagementServiceUrl}/tutors/${id}/materias`;
      try {
        this.logger.log(`Forwarding POST request to: ${url}`);
        const response = await firstValueFrom(this.httpService.post(url, addMateriasDto, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding POST tutores materias`, error);
        throw error;
      }
    }

    async removeMaterias(id: string, removeMateriasDto: any, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
      const url = `${this.tutoriasManagementServiceUrl}/tutors/${id}/materias`;
      try {
        this.logger.log(`Forwarding DELETE request to: ${url}`);
        const response = await firstValueFrom(this.httpService.delete(url, { ...config, data: removeMateriasDto }));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding DELETE tutores materias`, error);
        throw error;
      }
    }

    async getSystemOverview(req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/stats/overview`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET overview`, error);
        throw error;
      }
    }

    async getPopularSubjects(limit: number, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/stats/popular-subjects`;
      try {
        this.logger.log(`Forwarding GET request to: ${url} (limit=${limit})`);
        const response = await firstValueFrom(this.httpService.get(url, { ...config, params: { limit } }));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET popular-subjects`, error);
        throw error;
      }
    }

    async createSession(createSessionDto: CreateSessionDto, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/sessions`;
      try {
        this.logger.log(`Forwarding POST request to: ${url}`);
        const response = await firstValueFrom(this.httpService.post(url, createSessionDto, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding POST sessions`, error);
        throw error;
      }
    }

    async findSessionById(id: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/sessions/id/${id}`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET sessions/id`, error);
        throw error;
      }
    }

    async findByStudent(studentId: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/sessions/student/${studentId}`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET sessions/student`, error);
        throw error;
      }
    }

    async findByTutor(tutorId: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/sessions/tutor/${tutorId}`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET sessions/tutor`, error);
        throw error;
      }
    }

    async confirmSession(sessionId: string, tutorId: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/sessions/${sessionId}/confirmar`;
      try {
        this.logger.log(`Forwarding PATCH request to: ${url}`);
        const response = await firstValueFrom(this.httpService.patch(url, { tutorId }, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding PATCH sessions confirmar`, error);
        throw error;
      }
    }

    async rejectSession(sessionId: string, tutorId: string, rejectDto: any, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/sessions/${sessionId}/rechazar`;
      try {
        this.logger.log(`Forwarding PATCH request to: ${url}`);
        const response = await firstValueFrom(this.httpService.patch(url, rejectDto, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding PATCH sessions rechazar`, error);
        throw error;
      }
    }

    async cancelSession(sessionId: string, userId: string, cancelDto: any, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/sessions/${sessionId}/cancelar`;
      try {
        this.logger.log(`Forwarding PATCH request to: ${url}`);
        const response = await firstValueFrom(this.httpService.patch(url, cancelDto, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding PATCH sessions cancelar`, error);
        throw error;
      }
    }

    async completeSession(sessionId: string, tutorId: string, completeDto: any, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/sessions/${sessionId}/completar`;
      try {
        this.logger.log(`Forwarding PATCH request to: ${url}`);
        const response = await firstValueFrom(this.httpService.patch(url, completeDto, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding PATCH sessions completar`, error);
        throw error;
      }
    }

    async createRating(createRatingDto: any, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/ratings`;
      try {
        this.logger.log(`Forwarding POST request to: ${url}`);
        const response = await firstValueFrom(this.httpService.post(url, createRatingDto, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding POST ratings`, error);
        throw error;
      }
    }

    async findRatingsByTutor(tutorId: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/ratings/tutor/${tutorId}`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET ratings/tutor`, error);
        throw error;
      }
    }

    async findRatingsBySession(sessionId: string, req: Request) {
      const config = JwtForwardingHelper.getAxiosConfig(req);
        const url = `${this.tutoriasManagementServiceUrl}/api/ratings/session/${sessionId}`;
      try {
        this.logger.log(`Forwarding GET request to: ${url}`);
        const response = await firstValueFrom(this.httpService.get(url, config));
        return response.data;
      } catch (error) {
        this.logger.error(`Error forwarding GET ratings/session`, error);
        throw error;
      }
    }
}

