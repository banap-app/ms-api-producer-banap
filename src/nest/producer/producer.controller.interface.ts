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
