import { Module, Logger } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';

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