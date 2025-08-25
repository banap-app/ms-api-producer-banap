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
import {
  SwaggerCreateField,
  SwaggerDeleteField,
  SwaggerGetField,
  SwaggerListFields,
} from './field.controller.interface';
import { ListFieldUseCase } from 'src/core/field/application/use-cases/retrieve-field/ListFieldsUseCase';
import { DeleteFieldUseCase } from 'src/core/field/application/use-cases/delete-field/DeleteFieldUseCase';
import { GetFieldUseCase } from 'src/core/field/application/use-cases/retrieve-field/GetFieldUseCase';

@ApiSecurity('token')
@Controller('field')
export class FieldController {
  constructor(
    @Inject(CreateFieldUseCase)
    private readonly createFieldUseCase: CreateFieldUseCase,
    @Inject(ListFieldUseCase)
    private readonly listFieldUseCase: ListFieldUseCase,
    @Inject(GetFieldUseCase)
    private readonly getFieldUseCase: GetFieldUseCase,
    @Inject(DeleteFieldUseCase)
    private readonly deleteFieldUseCase: DeleteFieldUseCase,
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

  @SwaggerListFields()
  @Get()
  findAll(@Req() request) {
    const propertyId = request.query.propertyId as string;
    return this.listFieldUseCase.execute({ propertyId });
  }

  @SwaggerGetField()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getFieldUseCase.execute({ fieldId: id });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {}

  @SwaggerDeleteField()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteFieldUseCase.execute({ fieldId: id });
  }
}
