import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';
import { Logger } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [IaController],
  providers: [IaService],
})
export class IaModule {
  private readonly logger = new Logger(IaModule.name);

  constructor() {
    this.logger.log('IaModule loaded');
  }
}