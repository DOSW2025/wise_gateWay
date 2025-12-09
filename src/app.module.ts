import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { ComunidadModule } from './comunidad/comunidad.module';

@Module({
  imports: [AuthModule, UserManagementModule, NotificacionesModule, ComunidadModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
