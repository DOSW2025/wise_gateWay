import {
  Controller,
  Param,
  Req,
  Get,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notificaciones')
@UseGuards(JwtAuthGuard)
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Get('unread-count/:userid')
  notifyUnread(@Param('userid') userid: string, @Req() request: Request) {
    return this.notificacionesService.notifyUnread(userid, request);
  }

  @Get(`:userid`)
  usernotify(@Param('userid') userid: string, @Req() request: Request) {
    return this.notificacionesService.usernotify(userid, request);
  }
  @Delete(`:id`)
  notifyDelete(@Param('id') id: string, @Req() request: Request) {
    return this.notificacionesService.notifyDelete(id, request);
  }
  @Patch('read-all/:userid')
  allnotifyRead(@Param('userid') userid: string, @Req() request: Request) {
    return this.notificacionesService.allnotifyRead(userid, request);
  }

  @Patch('read/:id')
  notifyRead(@Param('id') id: string, @Req() request: Request) {
    return this.notificacionesService.notifyRead(id, request);
  }
}
