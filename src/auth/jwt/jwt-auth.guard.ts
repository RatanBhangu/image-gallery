import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'lib/common/decorators';
import { CustomException } from 'lib/common/utility-functions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, _info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user || !user?.exp) {
      if (_info?.name === 'TokenExpiredError')
        throw new CustomException(
          { message: 'Token Expired', success: false },
          HttpStatus.REQUEST_TIMEOUT,
          'Token Expired',
        );
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
