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
  Query,
} from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { CreateFieldUseCase } from 'src/core/field/application/use-cases/create-field/CreateFieldUseCase';
import { CreateFieldCommand } from 'src/core/field/application/use-cases/create-field/CreateFieldCommand';
import { ApiSecurity } from '@nestjs/swagger';
import {
  SwaggerCreateField,
  SwaggerGetField,
  SwaggerListField,
} from './field.controller.interface';
import { GetFieldUseCase } from 'src/core/field/application/use-cases/retrieve-field/GetFieldUseCase';
import { ListFieldUseCase } from 'src/core/field/application/use-cases/retrieve-field/ListFieldUseCase';

@ApiSecurity('token')
@Controller('field')
export class FieldController {
  constructor(
    @Inject(CreateFieldUseCase)
    private readonly createFieldUseCase: CreateFieldUseCase,
    @Inject(GetFieldUseCase)
    private readonly getFieldUseCase: GetFieldUseCase,
    @Inject(ListFieldUseCase)
    private readonly listFieldUseCase: ListFieldUseCase,
  ) {}

  @SwaggerCreateField()
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

  @SwaggerListField()
  @Get()
  findAll(@Query('id') id: string) {
    const propertyId = id as string;
    return this.listFieldUseCase.execute({
      propertyId,
    });
  }

  @SwaggerGetField()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getFieldUseCase.execute({
      fieldId: id,
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {}

  // @Delete(':id')
  // remove(@Param('id') id: string) {}
}
