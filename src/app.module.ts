import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { MaterialesModule } from './materiales/materiales.module';
import { PdfExportModule } from './pdf-export/pdf-export.module';
import { ComunidadModule } from './comunidad/comunidad.module';
import { IaModule } from './ia/ia.module';

@Module({
  imports: [
    AuthModule,
    UserManagementModule,
    NotificacionesModule,
    MaterialesModule,
    PdfExportModule,   
    IaModule,
    ComunidadModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
