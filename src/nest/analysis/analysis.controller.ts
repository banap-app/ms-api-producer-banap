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
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { CreateAnalysisUseCase } from '../../core/analysis/application/create-analysis/CreateAnalysisUseCase';
import { CreateAnalysisCommand } from '../../core/analysis/application/create-analysis/CreateAnalysisCommand';
import { Request } from 'express';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { SwaggerCreateAnalysis } from './analysis.controller.interface';
import { ListAnalysisUseCase } from 'src/core/analysis/application/retrieve-analysis/list-analysis/ListAnalysisUseCase';
import { ListAnalysisCommand } from 'src/core/analysis/application/retrieve-analysis/list-analysis/ListAnalysisCommand';

@ApiSecurity('token')
@Controller('analysis')
export class AnalysisController {
  constructor(
    @Inject(CreateAnalysisUseCase)
    private readonly createAnalysisUseCase: CreateAnalysisUseCase,
    @Inject(ListAnalysisUseCase)
    private readonly listAnalysisUseCase: ListAnalysisUseCase
  ) {}

  @SwaggerCreateAnalysis()
  @Post()
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

  @ApiOperation({
    description: "List all analysis",
    summary: "List all"
  })
  @Get(':id')
  findAll(@Param("id") id: string) {
    const aCommand = new ListAnalysisCommand(id)
    return this.listAnalysisUseCase.execute(aCommand)
  }
}
