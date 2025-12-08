import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { MaterialesModule } from './materiales/materiales.module';
import { PdfExportModule } from './pdf-export/pdf-export.module';

@Module({
  imports: [
    AuthModule,
    UserManagementModule,
    NotificacionesModule,
    MaterialesModule,
    PdfExportModule,   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
