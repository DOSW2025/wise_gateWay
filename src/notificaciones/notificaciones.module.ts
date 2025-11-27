import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
  imports: [HttpModule, AuthModule],
})
export class NotificacionesModule {}
