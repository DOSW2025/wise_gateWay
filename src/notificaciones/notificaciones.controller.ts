import {
  Controller,
  Post,
  Param,
  Body,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import type { Request } from 'express';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) { }

  @Get(`:userid`)
  usernotify(@Param('userid') userid: string,
    @Body() CreateNotificacioneDto: CreateNotificacioneDto,
    @Req() request: Request,
  ) {
    return this.notificacionesService.usernotify(userid, CreateNotificacioneDto, request);
  }
  @Get('unread-count/:userid')
  notifyUnread(@Param('userid') userid: string,
    @Body() CreateNotificacioneDto: CreateNotificacioneDto,
    @Req() request: Request,
  ) {
    return this.notificacionesService.notifyUnread(userid, CreateNotificacioneDto, request);
  }
  @Delete(`:id`)
  notifyDelete(@Param('id') id: string,
    @Body() CreateNotificacioneDto: CreateNotificacioneDto,
    @Req() request: Request,
  ) {
    return this.notificacionesService.notifyDelete(id, CreateNotificacioneDto, request);
  }
  @Post('read-all/:userid')
  allnotifyRead(@Param('userid') userid: string,
    @Body() CreateNotificacioneDto: CreateNotificacioneDto,
    @Req() request: Request,
  ) {
    return this.notificacionesService.allnotifyRead(userid, CreateNotificacioneDto, request);
  }
  @Post('read/:userid')
  notifyRead(@Param('userid') userid: string,
    @Body() CreateNotificacioneDto: CreateNotificacioneDto,
    @Req() request: Request,
  ) {
    return this.notificacionesService.notifyRead(userid, CreateNotificacioneDto, request);
  }
}
