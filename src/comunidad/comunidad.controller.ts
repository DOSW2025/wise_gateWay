import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
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
    ApiQuery,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { ComunidadService } from './comunidad.service';
import { JwtAuthGuard } from '../auth';

// Main controller with root prefix for direct routes like /forums, /chats, etc
@ApiTags('Comunidad - Forums & Chats')
@ApiBearerAuth('JWT-auth')
@Controller()
@UseGuards(JwtAuthGuard)
export class ComunidadController {
    constructor(private readonly comunidadService: ComunidadService) { }

    // ============ FORUMS - Direct routes ============

    @Get('forums')
    @ApiOperation({
        summary: 'Obtener todos los foros',
        description: 'Obtiene una lista de todos los foros disponibles',
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de foros obtenido exitosamente',
    })
    async getAllForums(@Req() request: Request) {
        return this.comunidadService.getAllForums(request);
    }

    @Post('forums')
    @ApiOperation({
        summary: 'Crear un nuevo foro',
        description: 'Crea un nuevo foro asociado a una materia',
    })
    @ApiResponse({
        status: 201,
        description: 'Foro creado exitosamente',
    })
    async createForum(@Body() createForumDto: any, @Req() request: Request) {
        return this.comunidadService.createForum(createForumDto, request);
    }

    @Get('forums/materias')
    @ApiOperation({
        summary: 'Obtener todas las materias',
        description: 'Obtiene una lista de todas las materias disponibles',
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de materias obtenido exitosamente',
    })
    async getMaterias(@Req() request: Request) {
        return this.comunidadService.getMaterias(request);
    }

    @Get('forums/:id')
    @ApiOperation({
        summary: 'Obtener un foro por ID',
        description: 'Obtiene los detalles de un foro específico',
    })
    @ApiParam({ name: 'id', description: 'ID del foro' })
    @ApiResponse({
        status: 200,
        description: 'Foro obtenido exitosamente',
    })
    async getForumById(@Param('id') forumId: string, @Req() request: Request) {
        return this.comunidadService.getForumById(forumId, request);
    }

    // ============ CHATS - Direct routes ============

    @Get('chats')
    @ApiOperation({
        summary: 'Obtener todos los chats/grupos',
        description: 'Obtiene una lista de todos los grupos de chat',
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de chats obtenido exitosamente',
    })
    async getAllChats(@Req() request: Request) {
        return this.comunidadService.getAllChats(request);
    }

    @Post('chats')
    @ApiOperation({
        summary: 'Crear un nuevo chat/grupo',
        description: 'Crea un nuevo grupo de chat',
    })
    @ApiResponse({
        status: 201,
        description: 'Chat creado exitosamente',
    })
    async createChat(@Body() createChatDto: any, @Req() request: Request) {
        return this.comunidadService.createChat(createChatDto, request);
    }

    @Get('chats/:id')
    @ApiOperation({
        summary: 'Obtener un chat por ID',
        description: 'Obtiene los detalles de un grupo de chat específico',
    })
    @ApiParam({ name: 'id', description: 'ID del chat' })
    @ApiResponse({
        status: 200,
        description: 'Chat obtenido exitosamente',
    })
    async getChatById(@Param('id') chatId: string, @Req() request: Request) {
        return this.comunidadService.getChatById(chatId, request);
    }

    // ============ THREADS - Direct routes ============

    @Get('threads')
    @ApiOperation({
        summary: 'Obtener todos los threads',
        description: 'Obtiene una lista de todos los hilos de conversación',
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de threads obtenido exitosamente',
    })
    async getThreads(@Req() request: Request) {
        return this.comunidadService.getThreads(request);
    }

    // ============ RESPONSES - Direct routes ============

    @Get('responses')
    @ApiOperation({
        summary: 'Obtener todas las respuestas',
        description: 'Obtiene una lista de todas las respuestas',
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de respuestas obtenido exitosamente',
    })
    async getResponses(@Req() request: Request) {
        return this.comunidadService.getResponses(request);
    }

    // ============ VOTES - Direct routes ============

    @Get('votes')
    @ApiOperation({
        summary: 'Obtener todos los votos',
        description: 'Obtiene una lista de todos los votos',
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de votos obtenido exitosamente',
    })
    async getVotes(@Req() request: Request) {
        return this.comunidadService.getVotes(request);
    }
}
