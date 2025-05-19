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
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { CreateFieldUseCase } from 'src/core/field/application/use-cases/create-field/CreateFieldUseCase';
import { CreateFieldCommand } from 'src/core/field/application/use-cases/create-field/CreateFieldCommand';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('token')
@Controller('field')
export class FieldController {
  constructor(
    @Inject(CreateFieldUseCase)
    private readonly createFieldUseCase: CreateFieldUseCase,
  ) {}

  @Post()
  create(@Body() createFieldDto: CreateFieldDto, @Req() request) {
    const aCommand = new CreateFieldCommand({
      crop: createFieldDto.crop,
      description: createFieldDto.description,
      isActive: createFieldDto.isActive,
      name: createFieldDto.name,
      producerId: request.user.id,
      propertyId: createFieldDto.propertyId,
      fieldBoundary: createFieldDto.fieldBoundary,
    });
    return this.createFieldUseCase.execute(aCommand);
  }

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
