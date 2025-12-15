import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Patch,
  Query,
  HttpCode,
  HttpStatus,
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
import { JwtAuthGuard, Roles, RolesGuard } from '../auth';
import { Role } from '../common/dto';
import { CreateGroupDto, 
  SendMessageBodyDto, 
  CreateReportDto, 
  UpdateReportStatusDto,
  EstadoReporte,
  TipoContenido,  
} from './dto';

// Main controller with root prefix for direct routes like /forums, /chats, etc
@ApiTags('Comunidad - Forums & Chats')
@ApiBearerAuth('JWT-auth')
@Controller()
@UseGuards(JwtAuthGuard)
export class ComunidadController {
  constructor(private readonly comunidadService: ComunidadService) {}

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

  @Post('forums/:id/close')
  @ApiOperation({
    summary: 'Cerrar un foro',
    description: 'Cierra un foro existente (solo creador)',
  })
  @ApiParam({ name: 'id', description: 'ID del foro' })
  @ApiResponse({
    status: 200,
    description: 'Foro cerrado exitosamente',
  })
  async closeForum(
    @Param('id') forumId: string,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.comunidadService.closeForum(forumId, body, request);
  }

  @Post('forums/:id/reopen')
  @ApiOperation({
    summary: 'Reabrir un foro',
    description: 'Reabre un foro cerrado (solo creador)',
  })
  @ApiParam({ name: 'id', description: 'ID del foro' })
  @ApiResponse({
    status: 200,
    description: 'Foro reabierto exitosamente',
  })
  async reopenForum(
    @Param('id') forumId: string,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.comunidadService.reopenForum(forumId, body, request);
  }

  @Post('forums/:id/edit')
  @ApiOperation({
    summary: 'Editar un foro',
    description: 'Edita un foro existente (solo creador)',
  })
  @ApiParam({ name: 'id', description: 'ID del foro' })
  @ApiResponse({
    status: 200,
    description: 'Foro editado exitosamente',
  })
  async editForum(
    @Param('id') forumId: string,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.comunidadService.editForum(forumId, body, request);
  }

  @Post('forums/:id/like')
  @ApiOperation({
    summary: 'Dar like a un foro',
    description: 'Registra un like en un foro',
  })
  @ApiParam({ name: 'id', description: 'ID del foro' })
  @ApiResponse({
    status: 200,
    description: 'Like registrado exitosamente',
  })
  async likeForum(@Param('id') forumId: string, @Req() request: Request) {
    return this.comunidadService.likeForum(forumId, request);
  }

  @Post('forums/:id/threads')
  @ApiOperation({
    summary: 'Crear un hilo en un foro',
    description: 'Crea un nuevo hilo de conversación en un foro',
  })
  @ApiParam({ name: 'id', description: 'ID del foro' })
  @ApiResponse({
    status: 201,
    description: 'Hilo creado exitosamente',
  })
  async createThreadInForum(
    @Param('id') forumId: string,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.comunidadService.createThreadInForum(forumId, body, request);
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
  async createChat(
    @Body() createChatDto: CreateGroupDto,
    @Req() request: Request,
  ) {
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

  @Get('chats/:id/messages')
  @ApiOperation({
    summary: 'Obtener mensajes de un chat',
    description: 'Obtiene todos los mensajes de un grupo de chat específico',
  })
  @ApiParam({ name: 'id', description: 'ID del chat' })
  @ApiResponse({
    status: 200,
    description: 'Mensajes obtenidos exitosamente',
  })
  async getChatMessages(@Param('id') chatId: string, @Req() request: Request) {
    return this.comunidadService.getChatMessages(chatId, request);
  }

  @Post('chats/:id/messages')
  @ApiOperation({
    summary: 'Enviar mensaje a un chat',
    description: 'Envía un nuevo mensaje a un grupo de chat',
  })
  @ApiParam({ name: 'id', description: 'ID del chat' })
  @ApiResponse({
    status: 201,
    description: 'Mensaje enviado exitosamente',
  })
  async sendChatMessage(
    @Param('id') chatId: string,
    @Body() sendMessageDto: SendMessageBodyDto,
    @Req() request: Request,
  ) {
    return this.comunidadService.sendChatMessage(
      chatId,
      sendMessageDto,
      request,
    );
  }

  @Delete('chats/:id')
  @ApiOperation({
    summary: 'Eliminar un chat',
    description: 'Elimina un grupo de chat',
  })
  @ApiParam({ name: 'id', description: 'ID del chat' })
  @ApiResponse({
    status: 200,
    description: 'Chat eliminado exitosamente',
  })
  async deleteChat(@Param('id') chatId: string, @Req() request: Request) {
    return this.comunidadService.deleteChat(chatId, request);
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

  @Get('threads/:id')
  @ApiOperation({
    summary: 'Obtener un thread por ID',
    description: 'Obtiene los detalles de un hilo específico',
  })
  @ApiParam({ name: 'id', description: 'ID del thread' })
  @ApiResponse({
    status: 200,
    description: 'Thread obtenido exitosamente',
  })
  async getThreadById(@Param('id') threadId: string, @Req() request: Request) {
    return this.comunidadService.getThreadById(threadId, request);
  }

  @Post('threads/:id/edit')
  @ApiOperation({
    summary: 'Editar un thread',
    description: 'Edita un thread existente',
  })
  @ApiParam({ name: 'id', description: 'ID del thread' })
  @ApiResponse({
    status: 200,
    description: 'Thread editado exitosamente',
  })
  async editThread(
    @Param('id') threadId: string,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.comunidadService.editThread(threadId, body, request);
  }

  @Post('threads/:id/like')
  @ApiOperation({
    summary: 'Dar like a un thread',
    description: 'Registra un like en un thread',
  })
  @ApiParam({ name: 'id', description: 'ID del thread' })
  @ApiResponse({
    status: 200,
    description: 'Like registrado exitosamente',
  })
  async likeThread(@Param('id') threadId: string, @Req() request: Request) {
    return this.comunidadService.likeThread(threadId, request);
  }

  // ============ RESPONSES - Direct routes ============

  @Post('responses')
  @ApiOperation({
    summary: 'Crear una respuesta',
    description: 'Crea una nueva respuesta a un hilo',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta creada exitosamente',
  })
  async createResponse(@Body() body: any, @Req() request: Request) {
    return this.comunidadService.createResponse(body, request);
  }

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

  @Get('responses/:id')
  @ApiOperation({
    summary: 'Obtener una respuesta por ID',
    description: 'Obtiene los detalles de una respuesta específica',
  })
  @ApiParam({ name: 'id', description: 'ID de la respuesta' })
  @ApiResponse({
    status: 200,
    description: 'Respuesta obtenida exitosamente',
  })
  async getResponseById(
    @Param('id') responseId: string,
    @Req() request: Request,
  ) {
    return this.comunidadService.getResponseById(responseId, request);
  }

  @Post('responses/:id/vote')
  @ApiOperation({
    summary: 'Votar una respuesta',
    description: 'Registra un voto positivo o negativo en una respuesta',
  })
  @ApiParam({ name: 'id', description: 'ID de la respuesta' })
  @ApiResponse({
    status: 200,
    description: 'Voto registrado exitosamente',
  })
  async voteResponse(
    @Param('id') responseId: string,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.comunidadService.voteResponse(responseId, body, request);
  }

  @Get('responses/:id/votes')
  @ApiOperation({
    summary: 'Obtener votos de una respuesta',
    description: 'Obtiene información de votos de una respuesta',
  })
  @ApiParam({ name: 'id', description: 'ID de la respuesta' })
  @ApiResponse({
    status: 200,
    description: 'Votos obtenidos exitosamente',
  })
  async getResponseVotes(
    @Param('id') responseId: string,
    @Req() request: Request,
  ) {
    return this.comunidadService.getResponseVotes(responseId, request);
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

  // ============ REPORTES - Direct routes ============
  @Post('reportes')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo reporte de contenido',
    description:
      'Permite a un usuario reportar contenido inapropiado de threads, respuestas o mensajes de chat.',
  })
  @ApiResponse({
    status: 201,
    description: 'El reporte fue enviado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o incompletos',
  })
  @ApiResponse({
    status: 404,
    description: 'El contenido reportado no existe',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya has reportado este contenido previamente',
  })
  async createReport(
    @Body() createReportDto: CreateReportDto,
    @Req() request: Request,
  ) {
    return this.comunidadService.createReport(createReportDto, request);
  }

  @Get('reportes')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Obtener todos los reportes',
    description:
      'Obtiene la lista de todos los reportes. Solo accesible para administradores.',
  })
  @ApiQuery({
    name: 'estado',
    required: false,
    enum: EstadoReporte,
    description: 'Filtrar reportes por estado',
  })
  @ApiQuery({
    name: 'tipoContenido',
    required: false,
    enum: TipoContenido,
    description: 'Filtrar reportes por tipo de contenido',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reportes obtenida exitosamente',
  })
  async getAllReports(
    @Query('estado') estado?: EstadoReporte,
    @Query('tipoContenido') tipoContenido?: TipoContenido,
    @Req() request?: Request,
  ) {
    return this.comunidadService.getAllReports(estado, tipoContenido, request);
  }

  @Get('reportes/estadisticas')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Obtener estadísticas de reportes',
    description: 'Obtiene estadísticas generales sobre los reportes del sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas obtenidas exitosamente',
  })
  async getReportStatistics(@Req() request: Request) {
    return this.comunidadService.getReportStatistics(request);
  }

  @Get('reportes/mis-reportes')
  @ApiOperation({
    summary: 'Obtener reportes del usuario autenticado',
    description: 'Obtiene todos los reportes realizados por el usuario actual.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reportes del usuario obtenida exitosamente',
  })
  async getMyReports(@Req() request: Request) {
    return this.comunidadService.getMyReports(request);
  }

  @Get('reportes/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Obtener un reporte específico por ID',
    description:
      'Obtiene los detalles completos de un reporte incluyendo el historial de logs.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del reporte',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte obtenido exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Reporte no encontrado',
  })
  async getReportById(@Param('id') id: string, @Req() request: Request) {
    return this.comunidadService.getReportById(id, request);
  }

  @Patch('reportes/:id/estado')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Actualizar el estado de un reporte',
    description:
      'Permite a administradores cambiar el estado de un reporte y añadir notas de moderación.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del reporte',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del reporte actualizado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Reporte no encontrado',
  })
  async updateReportStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateReportStatusDto,
    @Req() request: Request,
  ) {
    return this.comunidadService.updateReportStatus(
      id,
      updateStatusDto,
      request,
    );
  }
}
