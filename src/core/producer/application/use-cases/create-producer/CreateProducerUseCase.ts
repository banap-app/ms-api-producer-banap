import {
  ProducerOutput,
  ProducerOutputMapper,
} from '../commons/ProducerOutputMapper';
import { Producer } from '../../../domain/Producer';
import { ProducerRepository } from '../../../domain/ProducerRepository';
import { CreateProducerCommand } from './CreateProducerCommand';
import { UseCase } from '../../../../shared/application/IUseCase';
import { ICrypt } from '../../../../shared/application/ICrypt';
import { EntityValidationError } from '../../../../shared/domain/validators/ValidationErrors';

export class CreateProducerUseCase
  implements UseCase<CreateProducerCommand, CreateProducerOutput>
{
  private producerRepository: ProducerRepository;
  private cryptService: ICrypt;
  constructor(producerRepository: ProducerRepository, cryptService: ICrypt) {
    this.producerRepository = producerRepository;
    this.cryptService = cryptService;
  }
  async execute(
    aCommand: CreateProducerCommand,
  ): Promise<CreateProducerOutput> {
    const aProducer = Producer.create(aCommand);

    if (aProducer.notification.hasErrors()) {
      throw new EntityValidationError(aProducer.notification.toJSON());
    }

    const existsProducer = await this.producerRepository.findByEmail(
      aProducer.getEmail(),
    );
    if (existsProducer) {
      aProducer.notification.addError('Producer exists', 'producer');
      throw new Error(aProducer.notification.toJSON());
    }

    const hashPassword = await this.cryptService.encode(
      aProducer.getPassword().toString(),
      10,
    );

    aProducer.changePasswordHashed(hashPassword);
    await this.producerRepository.insert(aProducer);

    return ProducerOutputMapper.toOutput(aProducer);
  }
}

export type CreateProducerOutput = ProducerOutput;
