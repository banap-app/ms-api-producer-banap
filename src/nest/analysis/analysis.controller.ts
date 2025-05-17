import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { CreateAnalysisUseCase } from '../../core/analysis/application/create-analysis/CreateAnalysisUseCase';
import { CreateAnalysisCommand } from '../../core/analysis/application/create-analysis/CreateAnalysisCommand';

@Controller('analysis')
export class AnalysisController {
  constructor(
    @Inject(CreateAnalysisUseCase)
    private readonly createAnalysisUseCase: CreateAnalysisUseCase
  ) {}

  @Post()
  create(@Body() createAnalysisDto: CreateAnalysisDto) {
    const aCommand = new CreateAnalysisCommand({
      fieldId: createAnalysisDto.fieldId,
      isActive: createAnalysisDto.isActive,
      typeAnalysis: createAnalysisDto.typeAnalysis
    })
    return this.createAnalysisUseCase.execute(aCommand);
  }
}
