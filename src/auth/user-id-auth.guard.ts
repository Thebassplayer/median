import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserIdGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // Assuming the authenticated user's id is available in the request

    // Perform the authorization logic, e.g., compare userId with the id in the request parameters
    const requestedUserId = +request.params.id; // Convert to number if needed
    return userId === requestedUserId;
  }
}
