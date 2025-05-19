import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreatePropertyDto } from './dto/create-property.dto';
import { create } from 'lodash';

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
      example: [
        {
          id: '70556773-f8ec-48f4-915b-aa8a8b5bbaef',
          producerId: '190bdcf1-e087-486c-8d1b-15fea3f75c96',
          name: 'Banana farm',
          isActive: true,
          createdAt: '2023-10-01T00:00:00Z',
          updatedAt: '2023-10-01T00:00:00Z',
          deletedAt: null,
        },
        {
          id: '8889a53c-94db-46e1-b793-3b7b8c55fecf',
          producerId: '190bdcf1-e087-486c-8d1b-15fea3f75c96',
          name: 'Apple farm',
          isActive: true,
          createdAt: '2023-10-01T00:00:00Z',
          updatedAt: '2023-10-01T00:00:00Z',
          deletedAt: null,
        },
      ],
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
      example: {
        id: '70556773-f8ec-48f4-915b-aa8a8b5bbaef',
        producerId: '190bdcf1-e087-486c-8d1b-15fea3f75c96',
        name: 'Banana farm',
        isActive: true,
        createdAt: '2023-10-01T00:00:00Z',
        updatedAt: '2023-10-01T00:00:00Z',
        deletedAt: null,
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Property not found',
    }),
  );
}
