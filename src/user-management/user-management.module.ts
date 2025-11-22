import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserManagementController } from './user-management.controller';
import { UserManagementService } from './user-management.service';
import { AuthModule } from '../auth';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
