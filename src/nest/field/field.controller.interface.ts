import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateFieldDto } from './dto/create-field.dto';

export function SwaggerCreateField() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a Field' }),
    ApiBody({
      description: 'Field data',
      type: CreateFieldDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Field created successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input',
    }),
  );
}

export function SwaggerGetField() {
  return applyDecorators(ApiOperation({ summary: 'Get a Field' }));
}

export function SwaggerListField() {
  return applyDecorators(ApiOperation({ summary: 'List all Fields' }));
}
