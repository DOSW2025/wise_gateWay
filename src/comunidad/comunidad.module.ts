import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ComunidadService } from './comunidad.service';
import { ComunidadController } from './comunidad.controller';

@Module({
  imports: [HttpModule],
  controllers: [ComunidadController],
  providers: [ComunidadService],
})
export class ComunidadModule {}
