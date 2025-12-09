import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { envs } from '../config';
import type { Request } from 'express';
import { JwtForwardingHelper } from '../common/helpers';

@Injectable()
export class ComunidadService {
    private readonly logger = new Logger(ComunidadService.name);
    private readonly comunidadServiceUrl: string;

    constructor(private readonly httpService: HttpService) {
        let url = envs.comunidadAzure
            ? envs.comunidadAzure
            : `${envs.protocol}://${envs.comunidadHost}:${envs.comunidadPort}`;

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://${url}`;
        }

        this.comunidadServiceUrl = url.replace(/\/$/, '');
    }

    /**
     * Proxy para obtener todos los foros
     */
    async getAllForums(request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/forums`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para crear un foro
     */
    async createForum(createForumDto: any, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/forums`;

        try {
            this.logger.log(`Forwarding POST request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.post(url, createForumDto, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para obtener todas las materias
     */
    async getMaterias(request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/forums/materias`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para obtener un foro por ID
     */
    async getForumById(forumId: string, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/forums/${forumId}`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para cerrar un foro
     */
    async closeForum(forumId: string, body: any, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/forums/${forumId}/close`;

        try {
            this.logger.log(`Forwarding POST request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.post(url, body, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para editar un foro
     */
    async editForum(forumId: string, body: any, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/forums/${forumId}/edit`;

        try {
            this.logger.log(`Forwarding POST request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.post(url, body, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para dar like a un foro
     */
    async likeForum(forumId: string, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/forums/${forumId}/like`;

        try {
            this.logger.log(`Forwarding POST request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.post(url, {}, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para crear un hilo en un foro
     */
    async createThreadInForum(forumId: string, body: any, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/forums/${forumId}/threads`;

        try {
            this.logger.log(`Forwarding POST request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.post(url, body, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para obtener todos los chats/grupos
     */
    async getAllChats(request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/chats`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para crear un chat/grupo
     */
    async createChat(createChatDto: any, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/chats`;

        try {
            this.logger.log(`Forwarding POST request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.post(url, createChatDto, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para obtener un chat por ID
     */
    async getChatById(chatId: string, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/chats/${chatId}`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para obtener threads
     */
    async getThreads(request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/threads`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para obtener un thread por ID
     */
    async getThreadById(threadId: string, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/threads/${threadId}`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para editar un thread
     */
    async editThread(threadId: string, body: any, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/threads/${threadId}/edit`;

        try {
            this.logger.log(`Forwarding POST request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.post(url, body, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para dar like a un thread
     */
    async likeThread(threadId: string, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/threads/${threadId}/like`;

        try {
            this.logger.log(`Forwarding POST request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.post(url, {}, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para obtener respuestas/responses
     */
    async getResponses(request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/responses`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para obtener una respuesta por ID
     */
    async getResponseById(responseId: string, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/responses/${responseId}`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para votar una respuesta
     */
    async voteResponse(responseId: string, body: any, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/responses/${responseId}/vote`;

        try {
            this.logger.log(`Forwarding POST request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.post(url, body, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para obtener votos de una respuesta
     */
    async getResponseVotes(responseId: string, request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/responses/${responseId}/votes`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy para votos
     */
    async getVotes(request: Request) {
        const config = JwtForwardingHelper.getAxiosConfig(request);
        const url = `${this.comunidadServiceUrl}/votes`;

        try {
            this.logger.log(`Forwarding GET request to: ${url}`);
            const response = await firstValueFrom(
                this.httpService.get(url, config),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding request to comunidad service`, error);
            throw error;
        }
    }

    /**
     * Proxy genérico para cualquier ruta de comunidad
     */
    async forwardRequest(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        path: string,
        data?: any,
        request?: Request
    ) {
        const config = request ? JwtForwardingHelper.getAxiosConfig(request) : {};
        const url = `${this.comunidadServiceUrl}${path}`;

        try {
            this.logger.log(`Forwarding ${method} request to: ${url}`);

            let response;
            switch (method) {
                case 'GET':
                    response = await firstValueFrom(this.httpService.get(url, config));
                    break;
                case 'POST':
                    response = await firstValueFrom(this.httpService.post(url, data, config));
                    break;
                case 'PUT':
                    response = await firstValueFrom(this.httpService.put(url, data, config));
                    break;
                case 'PATCH':
                    response = await firstValueFrom(this.httpService.patch(url, data, config));
                    break;
                case 'DELETE':
                    response = await firstValueFrom(this.httpService.delete(url, config));
                    break;
            }

            return response.data;
        } catch (error) {
            this.logger.error(`Error forwarding ${method} request to comunidad service`, error);
            throw error;
        }
    }
}
