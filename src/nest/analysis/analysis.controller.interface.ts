import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAnalysisDto } from './dto/create-analysis.dto';

export function SwaggerCreateAnalysis() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a Analysis' }),
    ApiBody({
      description: 'Analysis data to be created',
      type: CreateAnalysisDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Analysis created successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input',
    }),
  );
}
