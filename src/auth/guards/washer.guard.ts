import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WasherGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.role !== 'WASHER' && user.role !== 'ADMIN') {
      throw new ForbiddenException('Washer or Admin access required');
    }

    return true;
  }
}

