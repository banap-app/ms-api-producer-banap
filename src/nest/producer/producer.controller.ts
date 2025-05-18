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
import { UpdateProducerUseCase } from 'src/core/producer/application/use-cases/update-producer/UpdateProducerUseCase';
import { UpdateProducerCommand } from 'src/core/producer/application/use-cases/update-producer/UpdateProducerCommand';
import { DeleteProducerCommand } from 'src/core/producer/application/use-cases/delete-producer/DeleteProducerCommand';
import { DeleteProducerUseCase } from 'src/core/producer/application/use-cases/delete-producer/DeleteProducerUseCase';
import { GetProducerUseCase } from 'src/core/producer/application/use-cases/retrieve-producer/get-producer/GetProducerUseCase';
import { SwaggerCreateProducer } from './producer.controller.interface';
import { TypeUser } from 'src/core/producer/domain/TypeUser';

@Controller('producer')
export class ProducerController {
  constructor(
    @Inject(CreateProducerUseCase)
    private readonly createProducerUseCase: CreateProducerUseCase,
    @Inject(UpdateProducerUseCase)
    private readonly updateProducerUseCase: UpdateProducerUseCase,
    @Inject(DeleteProducerUseCase)
    private readonly deleteProducerUseCase: DeleteProducerUseCase,
    @Inject(GetProducerUseCase)
    private readonly getProducerUseCase: GetProducerUseCase,
  ) {}

  @SwaggerCreateProducer()
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
      typeUser: createProducerDto.typeUser == 2 ? TypeUser.Producer : createProducerDto.typeUser == 1? TypeUser.Engineer : TypeUser.NULL
    });

    return this.createProducerUseCase.execute(command);
  }

  @Get()
  findAll() {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getProducerUseCase.execute({ producerId: id });
  }

  @Patch()
  update(@Body() updateProducerDto: UpdateProducerDto) {
    let profilePicture;

    if (!updateProducerDto) {
      throw new Error('Insert create producer DTO');
    }
    if (updateProducerDto && updateProducerDto.profilePicture) {
      const [result, error] = ProfilePicture.createFromFile({
        raw_name: updateProducerDto.profilePicture.raw_name,
        mime_type: updateProducerDto.profilePicture.mime_type,
        size: updateProducerDto.profilePicture.size,
      });

      if (error) {
        throw new BadRequestException(result.value);
      }

      profilePicture = result.value;
    }

    const command = new UpdateProducerCommand({
      producerId: updateProducerDto.producerId,
      name: updateProducerDto.name,
      email: updateProducerDto.email,
      password: updateProducerDto.password,
      isActive: updateProducerDto.isActive,
      profilePicture,
      typeUser: updateProducerDto.typeUser == 2 ? TypeUser.Producer : updateProducerDto.typeUser == 1? TypeUser.Engineer : TypeUser.NULL
    });

    return this.updateProducerUseCase.execute(command);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const command = new DeleteProducerCommand(id);
    this.deleteProducerUseCase.execute(command);
  }
}
