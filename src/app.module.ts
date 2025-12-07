import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { MaterialesModule } from './materiales/materiales.module';

@Module({
  imports: [AuthModule, UserManagementModule, NotificacionesModule, MaterialesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
