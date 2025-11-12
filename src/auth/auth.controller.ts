import { Controller, Post, Body, UseInterceptors, Headers } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { registroUsuario } from './dto/register.user';
import { loginUsuario } from './dto/login.user';
import { envs } from '../config/envs';
import { ProxyResponseInterceptor } from '../common/interceptors/proxy-response.interceptor';
import { HttpProxyHelper } from '../common/helpers/http-proxy.helper';

@Controller('auth')
@UseInterceptors(ProxyResponseInterceptor)
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('/registro')
  async create(@Body() registroUsuario: registroUsuario) {
    return HttpProxyHelper.proxyRequest(
      this.httpService,
      `http://${envs.authhost}:${envs.authport}/auth/registro`,
      'POST',
      registroUsuario,
    );
  }

  @Post('/login')
  async findAll(@Body() loginUsuario: loginUsuario) {
    return HttpProxyHelper.proxyRequest(
      this.httpService,
      `http://${envs.authhost}:${envs.authport}/auth/login`,
      'POST',
      loginUsuario,
    );
  }

  @Post('/prueba')
  async prueba (@Body() body:any, @Headers('authorization') authHeader?: string){
    return HttpProxyHelper.proxyRequest(
      this.httpService,
      `http://${envs.authhost}:${envs.authport}/auth/prueba`,
      'POST',
      body,
      authHeader,
    );
  }
}
