// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { AxiosService } from '../axios-module/axios.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly axios: AxiosService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization?.split(' ')[1];
    if (!authHeader) throw new UnauthorizedException();

    const user = await this.axios.post('/api/auth/verify', {
        token: authHeader
    })
    console.log(user.data?.errors)
    if (!user) throw new UnauthorizedException();
    req.user = user;
    return true;
  }
}
