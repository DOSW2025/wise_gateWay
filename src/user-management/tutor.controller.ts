import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { Roles, JwtAuthGuard, RolesGuard } from '../auth';
import { Role } from '../common/dto';
import { UserManagementService } from './user-management.service';
import { UpdatePersonalInfoDto } from './dto';

interface TutorProfilePayload {
    phone?: string;
    description?: string;
    location?: string;
}

@ApiTags('Tutor')
@ApiBearerAuth('JWT-auth')
@Controller('tutor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TutorController {
    constructor(private readonly userManagementService: UserManagementService) { }

    @Get('profile')
    @Roles(Role.TUTOR)
    @ApiOperation({ summary: 'Obtener mi perfil de tutor' })
    @ApiResponse({ status: 200, description: 'Perfil obtenido exitosamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    getProfile(@Req() request: Request) {
        return this.userManagementService.getMyProfile(request);
    }

    @Put('profile')
    @Roles(Role.TUTOR)
    @ApiOperation({ summary: 'Actualizar mi perfil de tutor' })
    @ApiResponse({ status: 200, description: 'Perfil actualizado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async updateProfile(
        @Body() body: TutorProfilePayload,
        @Req() request: Request,
    ) {
        const updateDto: UpdatePersonalInfoDto = {
            telefono: body.phone,
            biografia: body.description,
        };

        return this.userManagementService.updateMyPersonalInfo(updateDto, request);
    }
}
