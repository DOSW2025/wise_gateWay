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
import type { Request } from 'express';
import { UserManagementService } from './user-management.service';
import { FilterUsersDto, ChangeRoleDto, ChangeStatusDto, UpdatePersonalInfoDto, UserGrowthDto } from './dto';
import { JwtAuthGuard, RolesGuard, Roles } from '../auth';
import { Role } from '../common/dto';

@Controller('gestion-usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll(@Query() filterUsersDto: FilterUsersDto, @Req() request: Request) {
    return this.userManagementService.findAllWithFilters(filterUsersDto, request);
  }

  @Patch(':id/rol')
  @Roles(Role.ADMIN)
  changeRole(
    @Param('id') id: string,
    @Body() changeRoleDto: ChangeRoleDto,
    @Req() request: Request,
  ) {
    return this.userManagementService.changeRole(id, changeRoleDto, request);
  }

  @Patch(':id/estado')
  @Roles(Role.ADMIN)
  changeStatus(
    @Param('id') id: string,
    @Body() changeStatusDto: ChangeStatusDto,
    @Req() request: Request,
  ) {
    return this.userManagementService.changeStatus(id, changeStatusDto, request);
  }

  @Patch('me/info-personal')
  updateMyPersonalInfo(
    @Body() updatePersonalInfoDto: UpdatePersonalInfoDto,
    @Req() request: Request,
  ) {
    return this.userManagementService.updateMyPersonalInfo(updatePersonalInfoDto, request);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteUserByAdmin(@Param('id') id: string, @Req() request: Request) {
    return this.userManagementService.deleteUserByAdmin(id, request);
  }

  @Delete('me/cuenta')
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
