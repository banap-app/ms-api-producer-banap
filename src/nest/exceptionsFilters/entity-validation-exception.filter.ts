import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';

@Catch(EntityValidationError)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 400;
    return response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      response: exception.errors,
    });
  }
}
