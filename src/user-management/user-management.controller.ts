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
    description: 'Obtiene una lista paginada de todos los usuarios del sistema.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de registros por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Desplazamiento de registros', example: 0 })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuarios obtenida exitosamente',
    schema: {
      example: {
        data: [
          {
            id: '123',
            nombre: 'Juan Pérez',
            email: 'juan@example.com',
            rol: 'estudiante',
            estado: 'activo'
          }
        ],
        meta: {
          total: 100,
          page: 1,
          limit: 10
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tienes permisos de administrador' })
  findAll(@Query() filter: FilterUsersDto, @Req() request: Request) {
    return this.userManagementService.findAllWithFilters(filter, request);
  }

  @Patch(':id/rol')
  @Roles(Role.ADMIN)
  @ApiOperation({ 
    summary: 'Cambiar el rol de un usuario',
    description: 'Permite a un administrador cambiar el rol de cualquier usuario del sistema.'
  })
  @ApiParam({ name: 'id', description: 'ID del usuario a modificar', example: '123' })
  @ApiResponse({ 
    status: 200, 
    description: 'Rol actualizado exitosamente',
    schema: {
      example: {
        message: 'Rol actualizado exitosamente',
        user: {
          id: '123',
          rol: 'tutor'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tienes permisos de administrador' })
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
  @ApiOperation({ 
    summary: 'Cambiar el estado de un usuario',
    description: 'Permite a un administrador cambiar el estado de un usuario (activo, inactivo, suspendido, etc.).'
  })
  @ApiParam({ name: 'id', description: 'ID del usuario a modificar', example: '123' })
  @ApiResponse({ 
    status: 200, 
    description: 'Estado actualizado exitosamente',
    schema: {
      example: {
        message: 'Estado actualizado exitosamente',
        user: {
          id: '123',
          estado: 'suspendido'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tienes permisos de administrador' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  changeStatus(
    @Param('id') id: string,
    @Body() changeStatusDto: ChangeStatusDto,
    @Req() request: Request,
  ) {
    return this.userManagementService.changeStatus(id, changeStatusDto, request);
  }

  @Patch('me/info-personal')
  @ApiOperation({ 
    summary: 'Actualizar mi información personal',
    description: 'Permite a cualquier usuario autenticado actualizar su propia información personal (teléfono, biografía).'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Información personal actualizada exitosamente',
    schema: {
      example: {
        message: 'Información personal actualizada exitosamente',
        user: {
          telefono: '1234567890',
          biografia: 'Mi nueva biografía'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT inválido o ausente' })
  updateMyPersonalInfo(
    @Body() updatePersonalInfoDto: UpdatePersonalInfoDto,
    @Req() request: Request,
  ) {
    return this.userManagementService.updateMyPersonalInfo(updatePersonalInfoDto, request);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
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
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  deleteUserByAdmin(@Param('id') id: string, @Req() request: Request) {
    return this.userManagementService.deleteUserByAdmin(id, request);
  }

  @Delete('me/cuenta')
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
  getUserGrowth(@Query() userGrowthDto: UserGrowthDto, @Req() request: Request) {
    return this.userManagementService.getUserGrowth(userGrowthDto, request);
  }
}
