import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyUseCase } from 'src/core/property/application/use-cases/create-property/CreatePropertyUseCase';
import { CreatePropertyCommand } from 'src/core/property/application/use-cases/create-property/CreatePropertyCommand';

@Controller('property')
export class PropertyController {
  constructor(private readonly createPropertyUseCase: CreatePropertyUseCase) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    if (!createPropertyDto) {
      throw new Error('Insert create property DTO');
    }

    const command = new CreatePropertyCommand({
      producerId: createPropertyDto.producerId,
      name: createPropertyDto.name,
      isActive: createPropertyDto.isActive,
    });

    return this.createPropertyUseCase.execute(command);
  }

  // @Get()
  // findAll() {
  //   return this.propertyService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.propertyService.findOne(+id);
  // }

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
