import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';

@Module({
  imports: [HttpModule],
  controllers: [IaController],
  providers: [IaService],
})
export class IaModule {}