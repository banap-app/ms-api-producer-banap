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
  UseGuards,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { CreatePropertyUseCase } from 'src/core/property/application/use-cases/create-property/CreatePropertyUseCase';
import { CreatePropertyCommand } from 'src/core/property/application/use-cases/create-property/CreatePropertyCommand';
import {
  SwaggerCreateProperty,
  SwaggerDeleteProperty,
  SwaggerGetProperty,
  SwaggerListProperties,
} from './property.controller.interface';
import { GetPropertyUseCase } from 'src/core/property/application/use-cases/retrieve-property/GetPropertyUseCase';
import { ListPropertyUseCase } from 'src/core/property/application/use-cases/retrieve-property/ListPropertiesUseCase';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '../authguard/auth.guard';
import { DeletePropertyUseCase } from 'src/core/property/application/use-cases/delete-property/DeletePropertyUseCase';

@UseGuards(AuthGuard)
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
    @Inject(DeletePropertyUseCase)
    private readonly deletePropertyUseCase: DeletePropertyUseCase,
  ) {}

  @SwaggerCreateProperty()
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto, @Req() request) {
    if (!createPropertyDto) {
      throw new Error('Insert create property DTO');
    }
    const command = new CreatePropertyCommand({
      producerId: request.user.id,
      name: createPropertyDto.name,
      isActive: createPropertyDto.isActive,
    });

    return this.createPropertyUseCase.execute(command);
  }

  @SwaggerListProperties()
  @Get()
  findAll(@Req() request) {
    const producerId = request.user.id as string;
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

  @SwaggerDeleteProperty()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deletePropertyUseCase.execute({
      propertyId: id,
    });
  }
}
