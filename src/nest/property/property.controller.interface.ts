import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePropertyDto } from './dto/create-property.dto';

export function SwaggerCreateProperty() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a Property' }),
    ApiBody({
      description: 'Property data',
      type: CreatePropertyDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Property created successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input',
    }),
  );
}
