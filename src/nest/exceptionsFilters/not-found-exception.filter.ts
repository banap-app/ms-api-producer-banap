import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

@Catch(NotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 404;
    return response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      response: exception.message,
    });
  }
}
