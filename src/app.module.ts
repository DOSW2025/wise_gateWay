import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { MaterialesModule } from './materiales/materiales.module';
import { PdfExportModule } from './pdf-export/pdf-export.module';
import { ComunidadModule } from './comunidad/comunidad.module';
import { IaModule } from './ia/ia.module';
import { ThrottlerExceptionFilter } from './common/filters/throttler-exception.filter';
import { TutoriasModule } from './tutorias/tutorias.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60000,
        limit: 60,
      },
    ]),
    AuthModule,
    UserManagementModule,
    NotificacionesModule,
    MaterialesModule,
    PdfExportModule,   
    IaModule,
    ComunidadModule,
    TutoriasModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ThrottlerExceptionFilter,
    },
  ],
})
export class AppModule {}
