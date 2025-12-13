import { Module } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MaterialesController],
  providers: [MaterialesService],
  imports: [HttpModule, AuthModule],
})
export class MaterialesModule {}
