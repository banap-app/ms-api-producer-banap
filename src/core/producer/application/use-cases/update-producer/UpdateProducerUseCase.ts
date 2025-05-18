import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  ProducerOutput,
  ProducerOutputMapper,
} from '../commons/ProducerOutputMapper';
import { UpdateProducerCommand } from './UpdateProducerCommand';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { Producer } from 'src/core/producer/domain/Producer';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { ICrypt } from 'src/core/shared/application/ICrypt';
import { TypeUser } from 'src/core/producer/domain/TypeUser';

export class UpdateProducerUseCase
  implements UseCase<UpdateProducerCommand, UpdateProducerOutput>
{
  private producerRepository: ProducerRepository;
  private cryptService: ICrypt;
  constructor(producerRepository: ProducerRepository, cryptService: ICrypt) {
    this.producerRepository = producerRepository;
    this.cryptService = cryptService;
  }

  async execute(
    aCommand: UpdateProducerCommand,
  ): Promise<UpdateProducerOutput> {
    const aProducer = Producer.create(aCommand);

    if (aCommand.typeUser !== TypeUser.Producer) {
      aProducer.notification.addError('InvalidTypeOfUser', 'InvalidTypeUser');
    }

    if (aProducer.notification.hasErrors()) {
      throw new EntityValidationError(aProducer.notification.toJSON());
    }
    const hashPassword = await this.cryptService.encode(
      aProducer.getPassword().getValue,
      10,
    );
    aProducer.changePasswordHashed(hashPassword);
    await this.producerRepository.update(aProducer);
    return ProducerOutputMapper.toOutput(aProducer);
  }
}

export type UpdateProducerOutput = ProducerOutput;
