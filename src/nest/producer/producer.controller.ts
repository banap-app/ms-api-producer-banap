import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { CreateProducerCommand } from 'src/core/producer/application/use-cases/create-producer/CreateProducerCommand';
import { ProfilePicture } from 'src/core/producer/domain/ProfilePictureVo';
import { CreateProducerUseCase } from 'src/core/producer/application/use-cases/create-producer/CreateProducerUseCase';

@Controller('producer')
export class ProducerController {
  constructor(
    @Inject(CreateProducerUseCase)
    private readonly createProducerUseCase: CreateProducerUseCase,
  ) {}

  @Post()
  create(@Body() createProducerDto: CreateProducerDto) {
    let profilePicture;

    if (!createProducerDto) {
      throw new Error('Insert create producer DTO');
    }
    if (createProducerDto && createProducerDto.profilePicture) {
      const [result, error] = ProfilePicture.createFromFile({
        raw_name: createProducerDto.profilePicture.raw_name,
        mime_type: createProducerDto.profilePicture.mime_type,
        size: createProducerDto.profilePicture.size,
      });

      if (error) {
        throw new BadRequestException(result.value);
      }

      profilePicture = result.value;
    }

    const command = new CreateProducerCommand({
      name: createProducerDto.name,
      email: createProducerDto.email,
      password: createProducerDto.password,
      isActive: createProducerDto.isActive,
      profilePicture,
    });

    return this.createProducerUseCase.execute(command);
  }

  @Get()
  findAll() {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
