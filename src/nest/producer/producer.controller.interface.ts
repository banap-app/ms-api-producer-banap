import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateProducerDto } from './dto/create-producer.dto';

export function SwaggerCreateProducer() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a Producer' }),
    ApiBody({
      description: 'Producer data to be created',
      type: CreateProducerDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Producer created successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input',
    }),
  );
}

export function SwaggerGetProducer() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a Producer' }),
    ApiResponse({
      status: 200,
      description: 'Producer found',
      examples: {
        'application/json': {
          summary: 'Producer data',
          value: {
            id: '123',
            name: 'João da Silva',
            email: 'joao.silva@example.com',
            isActive: true,
            profilePicture: {
              raw_name: 'profile.jpg',
              mime_type: 'image/jpeg',
              size: 1024,
            },
            typeUser: 1,
            createdAt: '2023-10-01T00:00:00Z',
            updatedAt: '2023-10-01T00:00Z',
            deletedAt: null,
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Producer not found',
    }),
  );
}

export function SwaggerUpdateProducer() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a Producer' }),
    ApiBody({
      description: 'Producer data to be updated',
      type: CreateProducerDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Producer updated successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input',
    }),
  );
}

export function SwaggerDeleteProducer() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a Producer' }),
    ApiResponse({
      status: 200,
      description: 'Producer deleted successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Producer not found',
    }),
  );
}
