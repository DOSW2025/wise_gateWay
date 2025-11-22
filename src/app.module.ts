import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';

@Module({
  imports: [AuthModule, UserManagementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
