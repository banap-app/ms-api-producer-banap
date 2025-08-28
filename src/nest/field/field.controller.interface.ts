import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

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

export function SwaggerListFields() {
  return applyDecorators(
    ApiOperation({ summary: 'List all Fields' }),
    ApiQuery({
      name: 'propertyId',
      required: true,
      description: 'Filter fields by property ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'List of fields',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input',
    }),
  );
}

export function SwaggerGetField() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a Field by ID' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID of the field to retrieve',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Field retrieved successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Field not found',
    }),
  );
}

export function SwaggerDeleteField() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a Field' }),
    ApiResponse({
      status: 200,
      description: 'Field deleted successfully',
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID of the field to delete',
      type: String,
    }),
    ApiResponse({
      status: 404,
      description: 'Field not found',
    }),
  );
}

export function SwaggerUpdateField() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a Field' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID of the field to update',
      type: String,
    }),
    ApiBody({
      description: 'Updated field data',
      type: UpdateFieldDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Field updated successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Field not found',
    }),
  );
}
