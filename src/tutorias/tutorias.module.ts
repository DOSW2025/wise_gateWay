import { Module } from '@nestjs/common';
import { TutoriasService } from './tutorias.service';
import { TutoriasController } from './tutorias.controller';
import { AuthModule } from '../auth'; 
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule, AuthModule],
  controllers: [TutoriasController],
  providers: [TutoriasService],
})
export class TutoriasModule {}
