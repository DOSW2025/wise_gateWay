import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { TutoriasService } from './tutorias.service';
import {
  CreateTutoriaDto,
  UpdateTutoriaDto,
  FindUserByIdDto,
  FindUserByEmailDto,
  UpdateAvailabilityDto,
  CreateTutorDto,
  AddMateriasDto,
  RemoveMateriasDto,
  GetPopularSubjectsDto,
  CreateSessionDto,
  FindSessionByIdDto,
  ConfirmSessionDto,
  RejectSessionDto,
  CancelSessionDto,
  CompleteSessionDto,
  CreateRatingDto,
} from './dto';
import { JwtAuthGuard, RolesGuard, Roles, Public } from '../auth';
import { Role } from '../common/dto';
@Controller('tutorias')
export class TutoriasController {
  constructor(private readonly tutoriasService: TutoriasService) {}

  // ==================== TUTORES (Buscar y Gestionar) ====================
  @Get('tutores')
  @Public()
  findTutores(@Request() req: ExpressRequest) {
    return this.tutoriasService.findTutores(req);
  }

  @Get('by-materia/:codigo')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  getTutorsByMateria(
    @Param('codigo') codigo: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.getTutorsByMateria(codigo, req);
  }

  @Get('overview')
  @Public()
  getSystemOverview(@Request() req: ExpressRequest) {
    return this.tutoriasService.getSystemOverview(req);
  }

  @Get('popular-subjects')
  @Public()
  getPopularSubjects(
    @Query() query: GetPopularSubjectsDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.getPopularSubjects(query.limit ?? 10, req);
  }

  @Post()
  @Roles(Role.ADMIN)
  createTutor(
    @Body() createTutorDto: CreateTutorDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.create(createTutorDto, req);
  }

  @Patch('id/:id/availability')
  @Roles(Role.TUTOR, Role.ESTUDIANTE)
  updateAvailabilityById(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.updateAvailabilityById(
      id,
      updateAvailabilityDto.disponibilidad,
      req,
    );
  }

  @Patch('email/:email/availability')
  @Roles(Role.TUTOR, Role.ESTUDIANTE)
  updateAvailabilityByEmail(
    @Param('email') email: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.updateAvailabilityByEmail(
      email,
      updateAvailabilityDto.disponibilidad,
      req,
    );
  }

  @Get('disponibilidad/id/:id')
  @Public()
  getAvailabilityById(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.getAvailabilityById(id, req);
  }

  @Get('disponibilidad/email/:email')
  @Public()
  getAvailabilityByEmail(
    @Param('email') email: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.getAvailabilityByEmail(email, req);
  }

  @Get(':id/ratings')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  getTutorRatings(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.getTutorRatings(id, req);
  }

  @Get(':id/reputacion')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  getTutorReputacion(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.getTutorReputacion(id, req);
  }

  @Get(':id/materias')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  getTutorMaterias(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.getTutorMaterias(id, req);
  }

  @Post(':id/materias')
  @Roles(Role.ADMIN, Role.TUTOR)
  addMaterias(
    @Param('id') id: string,
    @Body() addMateriasDto: AddMateriasDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.addMaterias(id, addMateriasDto, req);
  }

  @Delete(':id/materias')
  @Roles(Role.ADMIN, Role.TUTOR)
  removeMaterias(
    @Param('id') id: string,
    @Body() removeMateriasDto: RemoveMateriasDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.removeMaterias(id, removeMateriasDto, req);
  }

  // ==================== SESIONES (Crear y Gestionar) ====================
  @Post('sessions')
  @Roles(Role.ESTUDIANTE, Role.TUTOR)
  createSession(
    @Body() createSessionDto: CreateSessionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.createSession(createSessionDto, req);
  }

  @Get('sessions/id/:id')
  @Public()
  findSessionById(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.findSessionById(id, req);
  }

  @Get('sessions/student/:studentId')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  findByStudent(
    @Param('studentId') studentId: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.findByStudent(studentId, req);
  }

  @Get('sessions/tutor/:tutorId')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  findSessionsByTutor(
    @Param('tutorId') tutorId: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.findByTutor(tutorId, req);
  }

  @Patch('sessions/:id/confirmar')
  @Roles(Role.TUTOR)
  confirmSession(
    @Param('id') sessionId: string,
    @Body() confirmDto: ConfirmSessionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.confirmSession(
      sessionId,
      confirmDto.tutorId,
      req,
    );
  }

  @Patch('sessions/:id/rechazar')
  @Roles(Role.TUTOR)
  rejectSession(
    @Param('id') sessionId: string,
    @Body() rejectDto: RejectSessionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.rejectSession(
      sessionId,
      rejectDto.tutorId,
      rejectDto,
      req,
    );
  }

  @Patch('sessions/:id/cancelar')
  @Roles(Role.ESTUDIANTE, Role.TUTOR)
  cancelSession(
    @Param('id') sessionId: string,
    @Body() cancelDto: CancelSessionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.cancelSession(
      sessionId,
      cancelDto.userId,
      cancelDto,
      req,
    );
  }

  @Patch('sessions/:id/completar')
  @Roles(Role.TUTOR)
  completeSession(
    @Param('id') sessionId: string,
    @Body() completeDto: CompleteSessionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.completeSession(
      sessionId,
      completeDto.tutorId,
      completeDto,
      req,
    );
  }

  // ==================== CALIFICACIONES (Crear y Consultar) ====================
  @Post('ratings')
  @Roles(Role.ESTUDIANTE)
  createRating(
    @Body() createRatingDto: CreateRatingDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.createRating(createRatingDto, req);
  }

  @Get('ratings/tutor/:tutorId')
  @Public()
  findRatingsByTutor(
    @Param('tutorId') tutorId: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.findRatingsByTutor(tutorId, req);
  }

  @Get('ratings/session/:sessionId')
  @Public()
  findRatingsBySession(
    @Param('sessionId') sessionId: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.findRatingsBySession(sessionId, req);
  }

  @Get('nombre/:id')
  @Public()
  getFullNameById(
    @Param() params: FindUserByIdDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.getFullNameById(params.id, req);
  }

  @Get('materia/:codigo')
  findByCodigo(
    @Param('codigo') codigo: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.findByCodigo(codigo, req);
  }

  @Get('upcoming/:userId')
  findUpcomingSessions(
    @Param('userId') userId: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.findUpcomingSessions(userId, req);
  }

  @Get('stats/:userId')
  getUserSessionStats(
    @Param('userId') userId: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.getUserSessionStats(userId, req);
  }

  @Get(':id/pending-sessions')
  getPendingSessions(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.getPendingSessions(id, req);
  }

  @Get(':id/confirmed-sessions')
  getConfirmedSessions(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.getConfirmedSessions(id, req);
  }
}
