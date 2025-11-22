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
import { PaginationDto, ChangeRoleDto, ChangeStatusDto, UpdatePersonalInfoDto } from './dto';
import { JwtAuthGuard, RolesGuard, Roles } from '../auth';
import { Role } from '../common/dto';

@Controller('gestion-usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll(@Query() paginationDto: PaginationDto, @Req() request: Request) {
    return this.userManagementService.findAllPaginated(paginationDto, request);
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
}
