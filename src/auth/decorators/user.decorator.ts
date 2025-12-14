import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRequestDto } from '../../common/dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserRequestDto => {
    const request = ctx.switchToHttp().getRequest<{ user: UserRequestDto }>();
    return request.user;
  },
);
