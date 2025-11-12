/**
 * EJEMPLOS DE USO DEL HttpProxyHelper
 *
 * Este archivo muestra cómo usar el helper en diferentes casos
 */

import { Controller, Get, Post, Body, Headers, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ProxyResponseInterceptor } from '../interceptors/proxy-response.interceptor';
import { HttpProxyHelper } from './http-proxy.helper';

// ============================================
// EJEMPLO 1: Petición SIN autenticación
// ============================================
@Controller('public')
@UseInterceptors(ProxyResponseInterceptor)
export class PublicController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/productos')
  async getProductos() {
    // No necesita JWT, es público
    return HttpProxyHelper.proxyRequest(
      this.httpService,
      'http://productos-service:3000/productos',
      'GET',
    );
  }
}

// ============================================
// EJEMPLO 2: Petición CON autenticación (propagando JWT)
// ============================================
@Controller('pedidos')
@UseInterceptors(ProxyResponseInterceptor)
export class PedidosController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/mis-pedidos')
  async misPedidos(@Headers('authorization') auth: string) {
    // Propaga el JWT del usuario al microservicio
    return HttpProxyHelper.proxyRequest(
      this.httpService,
      'http://pedidos-service:3000/pedidos',
      'GET',
      null,
      auth, // ← El microservicio puede verificar quién es el usuario
    );
  }

  @Post('/crear-pedido')
  async crearPedido(
    @Body() pedido: any,
    @Headers('authorization') auth: string,
  ) {
    // POST con datos Y autenticación
    return HttpProxyHelper.proxyRequest(
      this.httpService,
      'http://pedidos-service:3000/pedidos',
      'POST',
      pedido,
      auth, // ← El JWT se propaga
    );
  }
}

// ============================================
// EJEMPLO 3: Petición con headers adicionales
// ============================================
@Controller('avanzado')
@UseInterceptors(ProxyResponseInterceptor)
export class AvanzadoController {
  constructor(private readonly httpService: HttpService) {}

  @Post('/procesar')
  async procesarConHeaders(
    @Body() datos: any,
    @Headers('authorization') auth: string,
    @Headers('x-request-id') requestId: string,
  ) {
    return HttpProxyHelper.proxyRequest(
      this.httpService,
      'http://procesador-service:3000/procesar',
      'POST',
      datos,
      auth,
      {
        'x-request-id': requestId, // Headers adicionales
        'x-gateway-version': '1.0.0',
      },
    );
  }
}

// ============================================
// EJEMPLO 4: Múltiples llamadas a microservicios
// ============================================
@Controller('agregado')
@UseInterceptors(ProxyResponseInterceptor)
export class AgregadoController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/dashboard')
  async getDashboard(@Headers('authorization') auth: string) {
    // El gateway puede hacer múltiples llamadas a diferentes microservicios
    // y agregar los resultados

    const [pedidos, perfil, notificaciones] = await Promise.all([
      HttpProxyHelper.proxyRequest(
        this.httpService,
        'http://pedidos-service:3000/pedidos',
        'GET',
        null,
        auth,
      ),
      HttpProxyHelper.proxyRequest(
        this.httpService,
        'http://usuarios-service:3000/perfil',
        'GET',
        null,
        auth,
      ),
      HttpProxyHelper.proxyRequest(
        this.httpService,
        'http://notificaciones-service:3000/notificaciones',
        'GET',
        null,
        auth,
      ),
    ]);

    // Retornar datos agregados
    return {
      data: {
        pedidos: pedidos.data,
        perfil: perfil.data,
        notificaciones: notificaciones.data,
      },
      headers: pedidos.headers, // O combinar headers si es necesario
      status: 200,
    };
  }
}
