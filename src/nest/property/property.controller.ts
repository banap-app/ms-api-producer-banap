import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  Req,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { CreatePropertyUseCase } from 'src/core/property/application/use-cases/create-property/CreatePropertyUseCase';
import { CreatePropertyCommand } from 'src/core/property/application/use-cases/create-property/CreatePropertyCommand';
import {
  SwaggerCreateProperty,
  SwaggerGetProperty,
  SwaggerListProperties,
} from './property.controller.interface';
import { GetPropertyUseCase } from 'src/core/property/application/use-cases/retrieve-property/GetPropertyUseCase';
import { ListPropertyUseCase } from 'src/core/property/application/use-cases/retrieve-property/ListPropertiesUseCase';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('token') 
@Controller('property')
export class PropertyController {
  constructor(
    @Inject(CreatePropertyUseCase)
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    @Inject(GetPropertyUseCase)
    private readonly getPropertyUseCase: GetPropertyUseCase,
    @Inject(ListPropertyUseCase)
    private readonly listPropertyUseCase: ListPropertyUseCase,
  ) {}

  @SwaggerCreateProperty()
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto, @Req() request) {
    if (!createPropertyDto) {
      throw new Error('Insert create property DTO');
    }

    const command = new CreatePropertyCommand({
      producerId: request.user,
      name: createPropertyDto.name,
      isActive: createPropertyDto.isActive,
    });

    return this.createPropertyUseCase.execute(command);
  }

  @SwaggerListProperties()
  @Get()
  findAll(@Query('producerId') producerId: string) {
    return this.listPropertyUseCase.execute({
      producerId,
    });
  }

  @SwaggerGetProperty()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getPropertyUseCase.execute({
      propertyId: id,
    });
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePropertyDto: UpdatePropertyDto,
  // ) {
  //   return this.propertyService.update(+id, updatePropertyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.propertyService.remove(+id);
  // }
}
