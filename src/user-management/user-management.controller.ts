import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
<<<<<<< HEAD
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiParam,
  ApiQuery 
} from '@nestjs/swagger';
import type { Request } from 'express';
import { UserManagementService } from './user-management.service';
import { FilterUsersDto, ChangeRoleDto, ChangeStatusDto, UpdatePersonalInfoDto, UserGrowthDto } from './dto';
=======
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { UserManagementService } from './user-management.service';
import {
  FilterUsersDto,
  ChangeRoleDto,
  ChangeStatusDto,
  UpdatePersonalInfoDto,
  UserGrowthDto,
} from './dto';
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
import { JwtAuthGuard, RolesGuard, Roles } from '../auth';
import { Role } from '../common/dto';

@ApiTags('Gestión de Usuarios')
@ApiBearerAuth('JWT-auth')
@Controller('gestion-usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos los usuarios (Paginado)',
<<<<<<< HEAD
    description: 'Obtiene una lista paginada de todos los usuarios del sistema.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de registros por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Desplazamiento de registros', example: 0 })
  @ApiResponse({ 
    status: 200, 
=======
    description:
      'Obtiene una lista paginada de todos los usuarios del sistema.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de registros por página',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Desplazamiento de registros',
    example: 0,
  })
  @ApiResponse({
    status: 200,
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
    description: 'Lista de usuarios obtenida exitosamente',
    schema: {
      example: {
        data: [
          {
            id: '123',
            nombre: 'Juan Pérez',
            email: 'juan@example.com',
            rol: 'estudiante',
<<<<<<< HEAD
            estado: 'activo'
          }
=======
            estado: 'activo',
          },
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
        ],
        meta: {
          total: 100,
          page: 1,
<<<<<<< HEAD
          limit: 10
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tienes permisos de administrador' })
=======
          limit: 10,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o ausente',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - No tienes permisos de administrador',
  })
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  findAll(@Query() filter: FilterUsersDto, @Req() request: Request) {
    return this.userManagementService.findAllWithFilters(filter, request);
  }

  @Patch(':id/rol')
  @Roles(Role.ADMIN)
<<<<<<< HEAD
  @ApiOperation({ 
    summary: 'Cambiar el rol de un usuario',
    description: 'Permite a un administrador cambiar el rol de cualquier usuario del sistema.'
  })
  @ApiParam({ name: 'id', description: 'ID del usuario a modificar', example: '123' })
  @ApiResponse({ 
    status: 200, 
=======
  @ApiOperation({
    summary: 'Cambiar el rol de un usuario',
    description:
      'Permite a un administrador cambiar el rol de cualquier usuario del sistema.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a modificar',
    example: '123',
  })
  @ApiResponse({
    status: 200,
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
    description: 'Rol actualizado exitosamente',
    schema: {
      example: {
        message: 'Rol actualizado exitosamente',
        user: {
          id: '123',
<<<<<<< HEAD
          rol: 'tutor'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tienes permisos de administrador' })
=======
          rol: 'tutor',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o ausente',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - No tienes permisos de administrador',
  })
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  changeRole(
    @Param('id') id: string,
    @Body() changeRoleDto: ChangeRoleDto,
    @Req() request: Request,
  ) {
    return this.userManagementService.changeRole(id, changeRoleDto, request);
  }

  @Patch(':id/estado')
  @Roles(Role.ADMIN)
<<<<<<< HEAD
  @ApiOperation({ 
    summary: 'Cambiar el estado de un usuario',
    description: 'Permite a un administrador cambiar el estado de un usuario (activo, inactivo, suspendido, etc.).'
  })
  @ApiParam({ name: 'id', description: 'ID del usuario a modificar', example: '123' })
  @ApiResponse({ 
    status: 200, 
=======
  @ApiOperation({
    summary: 'Cambiar el estado de un usuario',
    description:
      'Permite a un administrador cambiar el estado de un usuario (activo, inactivo, suspendido, etc.).',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a modificar',
    example: '123',
  })
  @ApiResponse({
    status: 200,
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
    description: 'Estado actualizado exitosamente',
    schema: {
      example: {
        message: 'Estado actualizado exitosamente',
        user: {
          id: '123',
<<<<<<< HEAD
          estado: 'suspendido'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tienes permisos de administrador' })
=======
          estado: 'suspendido',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o ausente',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - No tienes permisos de administrador',
  })
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  changeStatus(
    @Param('id') id: string,
    @Body() changeStatusDto: ChangeStatusDto,
    @Req() request: Request,
  ) {
    return this.userManagementService.changeStatus(
      id,
      changeStatusDto,
      request,
    );
  }

  @Get('me')
  @ApiOperation({
    summary: 'Obtener mi perfil',
    description:
      'Devuelve la información del usuario autenticado (teléfono, biografía, rol y estado).',
  })
  @ApiResponse({ status: 200, description: 'Perfil obtenido exitosamente' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o ausente',
  })
  getMyProfile(@Req() request: Request) {
    return this.userManagementService.getMyProfile(request);
  }

  @Patch('me/info-personal')
<<<<<<< HEAD
  @ApiOperation({ 
    summary: 'Actualizar mi información personal',
    description: 'Permite a cualquier usuario autenticado actualizar su propia información personal (teléfono, biografía).'
  })
  @ApiResponse({ 
    status: 200, 
=======
  @ApiOperation({
    summary: 'Actualizar mi información personal',
    description:
      'Permite a cualquier usuario autenticado actualizar su propia información personal (teléfono, biografía).',
  })
  @ApiResponse({
    status: 200,
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
    description: 'Información personal actualizada exitosamente',
    schema: {
      example: {
        message: 'Información personal actualizada exitosamente',
        user: {
          telefono: '1234567890',
<<<<<<< HEAD
          biografia: 'Mi nueva biografía'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
=======
          biografia: 'Mi nueva biografía',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o ausente',
  })
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  updateMyPersonalInfo(
    @Body() updatePersonalInfoDto: UpdatePersonalInfoDto,
    @Req() request: Request,
  ) {
    return this.userManagementService.updateMyPersonalInfo(
      updatePersonalInfoDto,
      request,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
<<<<<<< HEAD
  @ApiOperation({ 
    summary: 'Eliminar un usuario (Solo Admin)',
    description: 'Permite a un administrador eliminar permanentemente un usuario del sistema.'
  })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar', example: '123' })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario eliminado exitosamente',
    schema: {
      example: {
        message: 'Usuario eliminado exitosamente'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tienes permisos de administrador' })
=======
  @ApiOperation({
    summary: 'Eliminar un usuario (Solo Admin)',
    description:
      'Permite a un administrador eliminar permanentemente un usuario del sistema.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a eliminar',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado exitosamente',
    schema: {
      example: {
        message: 'Usuario eliminado exitosamente',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o ausente',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - No tienes permisos de administrador',
  })
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  deleteUserByAdmin(@Param('id') id: string, @Req() request: Request) {
    return this.userManagementService.deleteUserByAdmin(id, request);
  }

  @Delete('me/cuenta')
<<<<<<< HEAD
  @ApiOperation({ 
    summary: 'Eliminar mi propia cuenta',
    description: 'Permite a cualquier usuario autenticado eliminar su propia cuenta del sistema.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cuenta eliminada exitosamente',
    schema: {
      example: {
        message: 'Tu cuenta ha sido eliminada exitosamente'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
=======
  @ApiOperation({
    summary: 'Eliminar mi propia cuenta',
    description:
      'Permite a cualquier usuario autenticado eliminar su propia cuenta del sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cuenta eliminada exitosamente',
    schema: {
      example: {
        message: 'Tu cuenta ha sido eliminada exitosamente',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o ausente',
  })
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  deleteMyAccount(@Req() request: Request) {
    return this.userManagementService.deleteMyAccount(request);
  }
  @Get('estadisticas/usuarios')
  @Roles(Role.ADMIN)
  getUserStatistics(@Req() request: Request) {
    return this.userManagementService.getUserStatistics(request);
  }

  @Get('estadisticas/roles')
  @Roles(Role.ADMIN)
  getRoleStatistics(@Req() request: Request) {
    return this.userManagementService.getRoleStatistics(request);
  }

  @Get('estadisticas/crecimiento')
  @Roles(Role.ADMIN)
<<<<<<< HEAD
  getUserGrowth(@Query() userGrowthDto: UserGrowthDto, @Req() request: Request) {
=======
  getUserGrowth(
    @Query() userGrowthDto: UserGrowthDto,
    @Req() request: Request,
  ) {
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
    return this.userManagementService.getUserGrowth(userGrowthDto, request);
  }
}
