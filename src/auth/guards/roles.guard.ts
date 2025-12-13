import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';
import { Role, UserRequestDto } from '../../common/dto';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user: UserRequestDto }>();
    const user = request.user;
    const hasRole = requiredRoles.some((role) => user.rol === role);

    if (!hasRole) {
      this.logger.debug(
        `Access denied: User ${user.id || 'unknown'} with role '${user.rol}' attempted to access endpoint requiring roles: [${requiredRoles.join(', ')}]`,
      );
    }

    return hasRole;
  }
}
