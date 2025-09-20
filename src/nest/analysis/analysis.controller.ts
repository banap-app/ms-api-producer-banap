import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Req,
} from '@nestjs/common';
import {
  CreateAnalysisDto,
  LimingAnalysisDto,
  LimingAnalysisDtoDesiredOptional,
  NpkAnalysisDto,
} from './dto/create-analysis.dto';
import { CreateAnalysisUseCase } from '../../core/analysis/application/create-analysis/CreateAnalysisUseCase';
import { CreateAnalysisCommand } from '../../core/analysis/application/create-analysis/CreateAnalysisCommand';
import { Request } from 'express';
import {
  ApiBody,
  ApiOperation,
  ApiSecurity,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  SwaggerCreateAnalysis,
  SwaggerDeleteAnalysis,
  SwaggerListAnalysis,
} from './analysis.controller.interface';
import { ListAnalysisUseCase } from 'src/core/analysis/application/retrieve-analysis/list-analysis/ListAnalysisUseCase';
import { ListAnalysisCommand } from 'src/core/analysis/application/retrieve-analysis/list-analysis/ListAnalysisCommand';
import { DeleteAnalysisUseCase } from 'src/core/analysis/application/delete-analysis/DeleteAnalysisUseCase';
import { GetAnalysisUseCase } from 'src/core/analysis/application/retrieve-analysis/get-analysis/GetAnalysisUseCase';

@ApiSecurity('token')
@Controller('analysis')
export class AnalysisController {
  constructor(
    @Inject(CreateAnalysisUseCase)
    private readonly createAnalysisUseCase: CreateAnalysisUseCase,
    @Inject(ListAnalysisUseCase)
    private readonly listAnalysisUseCase: ListAnalysisUseCase,
    @Inject(DeleteAnalysisUseCase)
    private readonly deleteAnalysisUseCase: DeleteAnalysisUseCase,
    @Inject(GetAnalysisUseCase)
    private readonly getAnalysisUseCase: GetAnalysisUseCase,
  ) {}

  @SwaggerCreateAnalysis()
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fieldId: { type: 'string', format: 'uuid' },
        isActive: { type: 'boolean' },
        typeAnalysis: {
          oneOf: [
            { $ref: getSchemaPath(LimingAnalysisDtoDesiredOptional) },
            { $ref: getSchemaPath(NpkAnalysisDto) },
          ],
        },
      },
      required: ['fieldId', 'isActive', 'typeAnalysis'],
    },
    examples: {
      LIMING: {
        value: {
          fieldId: '8a9f3a3e-79bd-4f9f-b672-024f3cc0d6e2',
          isActive: true,
          typeAnalysis: {
            desiredBaseSaturation: 60,
            currentBaseSaturation: 45,
            totalCationExchangeCapacity: 12,
            relativeTotalNeutralizingPower: 80,
          },
        },
      },
      NPK: {
        value: {
          fieldId: '8a9f3a3e-79bd-4f9f-b672-024f3cc0d6e2',
          isActive: true,
          typeAnalysis: {
            expectedProductivity: 3500,
            phosphor: 12,
            potassium: 80,
          },
        },
      },
    },
  })
  create(
    @Req() request: Request,
    @Body() createAnalysisDto: CreateAnalysisDto,
  ) {
    const aCommand = new CreateAnalysisCommand({
      fieldId: createAnalysisDto.fieldId,
      isActive: createAnalysisDto.isActive,
      typeAnalysis: createAnalysisDto.typeAnalysis,
    });
    return this.createAnalysisUseCase.execute(aCommand);
  }

  @SwaggerListAnalysis()
  @Get(':fieldId')
  findAll(@Param('fieldId') fieldId: string) {
    const aCommand = new ListAnalysisCommand(fieldId);
    return this.listAnalysisUseCase.execute(aCommand);
  }

  @Get('/by_id/:analysisId')
  findAnalysis(@Param('analysisId') analysisId: string) {
    return this.getAnalysisUseCase.execute({
      analysisId,
    });
  }

  @SwaggerDeleteAnalysis()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteAnalysisUseCase.execute({
      analysisId: id,
    });
  }
}
