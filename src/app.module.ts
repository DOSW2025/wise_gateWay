import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { IaModule } from './ia/ia.module';

@Module({
  imports: [
    AuthModule,
    UserManagementModule,
    NotificacionesModule,
    IaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
