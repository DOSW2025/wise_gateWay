import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { envs } from '../config/envs';

@Injectable()
export class UsersService {
    private readonly authServiceUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.authServiceUrl = envs.authazure || `${envs.authprotocol}://${envs.authhost}:${envs.authport}`;
    }

    async findAll(params: any, token: string) {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.authServiceUrl}/users`, {
                params,
                headers: { Authorization: token },
            }).pipe(
                catchError((error: AxiosError) => {
                    throw new HttpException(error.response?.data || 'Error connecting to auth service', error.response?.status || 500);
                }),
            ),
        );
        return data;
    }

    async updateRole(id: string, role: string, token: string) {
        const { data } = await firstValueFrom(
            this.httpService.patch(
                `${this.authServiceUrl}/users/${id}/role`,
                { role },
                { headers: { Authorization: token } },
            ).pipe(
                catchError((error: AxiosError) => {
                    throw new HttpException(error.response?.data || 'Error connecting to auth service', error.response?.status || 500);
                }),
            ),
        );
        return data;
    }

    async suspend(id: string, reason: string, token: string) {
        const { data } = await firstValueFrom(
            this.httpService.patch(
                `${this.authServiceUrl}/users/${id}/suspend`,
                { reason },
                { headers: { Authorization: token } },
            ).pipe(
                catchError((error: AxiosError) => {
                    throw new HttpException(error.response?.data || 'Error connecting to auth service', error.response?.status || 500);
                }),
            ),
        );
        return data;
    }

    async activate(id: string, token: string) {
        const { data } = await firstValueFrom(
            this.httpService.patch(
                `${this.authServiceUrl}/users/${id}/activate`,
                {},
                { headers: { Authorization: token } },
            ).pipe(
                catchError((error: AxiosError) => {
                    throw new HttpException(error.response?.data || 'Error connecting to auth service', error.response?.status || 500);
                }),
            ),
        );
        return data;
    }
}
