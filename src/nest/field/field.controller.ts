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
  SwaggerUpdateField,
} from './field.controller.interface';
import { ListFieldUseCase } from 'src/core/field/application/use-cases/retrieve-field/ListFieldsUseCase';
import { DeleteFieldUseCase } from 'src/core/field/application/use-cases/delete-field/DeleteFieldUseCase';
import { GetFieldUseCase } from 'src/core/field/application/use-cases/retrieve-field/GetFieldUseCase';
import { UpdateFieldUseCase } from 'src/core/field/application/use-cases/update-field/UpdateFieldUseCase';
import { UpdateFieldCommand } from 'src/core/field/application/use-cases/update-field/UpdateFieldcommand';

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
    @Inject(UpdateFieldUseCase)
    private readonly updateFieldUseCase: UpdateFieldUseCase,
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

  @SwaggerUpdateField()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    if (!updateFieldDto) {
      throw new Error('Insert update field DTO');
    }

    const aCommand = new UpdateFieldCommand({
      fieldId: id,
      propertyId: updateFieldDto.propertyId,
      producerId: updateFieldDto.producerId,
      name: updateFieldDto.name,
      description: updateFieldDto.description,
      crop: updateFieldDto.crop,
      fieldBoundary: updateFieldDto.fieldBoundary,
    });
    return this.updateFieldUseCase.execute(aCommand);
  }

  @SwaggerDeleteField()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteFieldUseCase.execute({ fieldId: id });
  }
}
