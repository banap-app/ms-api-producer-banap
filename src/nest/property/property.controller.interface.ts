import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
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

export function SwaggerListProperties() {
  return applyDecorators(
    ApiOperation({ summary: 'List all Properties' }),
    ApiResponse({
      status: 200,
      description: 'List of properties',
    }),
    ApiResponse({
      status: 404,
      description: 'No properties found',
    }),
  );
}

export function SwaggerGetProperty() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a Property by ID' }),
    ApiResponse({
      status: 200,
      description: 'Property found',
    }),
    ApiResponse({
      status: 404,
      description: 'Property not found',
    }),
  );
}
