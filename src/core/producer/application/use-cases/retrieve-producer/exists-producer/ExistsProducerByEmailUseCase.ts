import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { UseCase } from '../../../../../shared/application/IUseCase';
import {
  ProducerOutput,
  ProducerOutputMapper,
} from '../../commons/ProducerOutputMapper';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

export class ExistsProducerCommand {
  email: string;
}

export type ExistsProducerOutput = ProducerOutput;

export class ExistsProducerByEmailUseCase
  implements UseCase<ExistsProducerCommand, ExistsProducerOutput>
{
  constructor(private readonly producerRepository: ProducerRepository) {}
  async execute(aCommand: ExistsProducerCommand): Promise<ProducerOutput> {
    const anEmail = aCommand.email;

    const producer = await this.producerRepository.findByEmail(anEmail);

    if (!producer || !producer.getIsActive()) {
      throw new NotFoundError('Producer not exists');
    }

    return ProducerOutputMapper.toOutput(producer);
  }
}
