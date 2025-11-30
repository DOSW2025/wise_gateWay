import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { TutoriasService } from './tutorias.service';
import { CreateTutoriaDto } from './dto/create-tutoria.dto';
import { UpdateTutoriaDto } from './dto/update-tutoria.dto';
import { JwtAuthGuard, RolesGuard, Roles, Public } from '../auth'; 
import { Role } from '../common/dto'; 
@Controller('tutorias')
export class TutoriasController {
  constructor(private readonly tutoriasService: TutoriasService) {}

  @Get('id/:id')
  @Public()
  findById(@Param() params: FindUserByIdDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.findById(params.id, req);
  }

  @Get('email/:email')
  @Public()
  findByEmail(@Param() params: FindUserByEmailDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.findByEmail(params.email, req);
  }

  @Patch('id/:id/availability')
  @Roles(Role.TUTOR, Role.ESTUDIANTE)
  updateAvailabilityById(
    @Param() params: FindUserByIdDto,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.updateAvailabilityById(params.id, updateAvailabilityDto.disponibilidad, req);
  }

  @Patch('email/:email/availability')
  @Roles(Role.TUTOR, Role.ESTUDIANTE)
  updateAvailabilityByEmail(
    @Param() params: FindUserByEmailDto,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.updateAvailabilityByEmail(params.email, updateAvailabilityDto.disponibilidad, req);
  }

  @Get('estudiantes')
  @Public()
  findEstudiantes(@Request() req: ExpressRequest) {
    return this.tutoriasService.findEstudiantes(req);
  }

  @Get('tutores')
  @Public()
  findTutores(@Request() req: ExpressRequest) {
    return this.tutoriasService.findTutores(req);
  }

  @Get('disponibilidad/id/:id')
  @Public()
  getAvailabilityById(@Param() params: FindUserByIdDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.getAvailabilityById(params.id, req);
  }

  @Get('disponibilidad/email/:email')
  @Public()
  getAvailabilityByEmail(@Param() params: FindUserByEmailDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.getAvailabilityByEmail(params.email, req);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createTutorDto: CreateTutorDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.create(createTutorDto, req);
  }

  @Get('by-email/:email')
  @Public()
  findByEmail(@Param('email') email: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.findByEmail(email, req);
  }

  @Get('by-materia/:codigo')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  getTutorsByMateria(@Param('codigo') codigo: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.getTutorsByMateria(codigo, req);
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

  @Get(':id')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  findById(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.findById(id, req);
  }

  @Post(':id/materias')
  @Roles(Role.ADMIN, Role.TUTOR)
  addMaterias(@Param('id') id: string, @Body() addMateriasDto: AddMateriasDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.addMaterias(id, addMateriasDto, req);
  }

  @Delete(':id/materias')
  @Roles(Role.ADMIN, Role.TUTOR)
  removeMaterias(@Param('id') id: string, @Body() removeMateriasDto: RemoveMateriasDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.removeMaterias(id, removeMateriasDto, req);
  }

  @Get('overview')
  @Public()
  getSystemOverview(@Request() req: ExpressRequest) {
    return this.tutoriasService.getSystemOverview(req);
  }

  @Get('popular-subjects')
  @Public()
  getPopularSubjects(@Query() query: GetPopularSubjectsDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.getPopularSubjects(query.limit, req);
  }


  @Post()
  @Roles(Role.ESTUDIANTE, Role.TUTOR)
  create(@Body() createSessionDto: CreateSessionDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.createSession(createSessionDto, req);
  }

  @Get('id/:id')
  @Public()
  findById(@Param() params: FindSessionByIdDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.findSessionById(params.id, req);
  }

  @Get('student/:studentId')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  findByStudent(@Param('studentId') studentId: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.findByStudent(studentId, req);
  }

 
  @Get('tutor/:tutorId')
  @Roles(Role.ESTUDIANTE, Role.ADMIN, Role.TUTOR)
  findByTutor(@Param('tutorId') tutorId: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.findByTutor(tutorId, req);
  }
  @Patch(':id/confirmar')
  @Roles(Role.TUTOR)
  confirm(
    @Param('id') sessionId: string,
    @Body() confirmDto: ConfirmSessionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.confirmSession(sessionId, confirmDto.tutorId, req);
  }

  @Patch(':id/rechazar')
  @Roles(Role.TUTOR)
  reject(
    @Param('id') sessionId: string,
    @Body() rejectDto: RejectSessionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.rejectSession(sessionId, rejectDto.tutorId, rejectDto, req);
  }


  @Patch(':id/cancelar')
  @Roles(Role.ESTUDIANTE, Role.TUTOR)
  cancel(
    @Param('id') sessionId: string,
    @Body() cancelDto: CancelSessionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.cancelSession(sessionId, cancelDto.userId, cancelDto, req);
  }

 
  @Patch(':id/completar')
  @Roles(Role.TUTOR)
  complete(
    @Param('id') sessionId: string,
    @Body() completeDto: CompleteSessionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.tutoriasService.completeSession(sessionId, completeDto.tutorId, completeDto, req);
  }

  @Post()
  @Roles(Role.ESTUDIANTE)
  create(@Body() createRatingDto: CreateRatingDto, @Request() req: ExpressRequest) {
    return this.tutoriasService.createRating(createRatingDto, req);
  }

  @Get('tutor/:tutorId')
  @Public()
  findByTutor(@Param('tutorId') tutorId: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.findRatingsByTutor(tutorId, req);
  }

 
  @Get('session/:sessionId')
  @Public()
  findBySession(@Param('sessionId') sessionId: string, @Request() req: ExpressRequest) {
    return this.tutoriasService.findRatingsBySession(sessionId, req);
  }
}
