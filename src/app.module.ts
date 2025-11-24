import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

@Module({
  imports: [AuthModule, UserManagementModule, NotificacionesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
