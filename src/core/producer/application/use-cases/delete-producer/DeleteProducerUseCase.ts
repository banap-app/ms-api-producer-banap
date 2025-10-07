import { UseCase } from 'src/core/shared/application/IUseCase';
import { DeleteProducerCommand } from './DeleteProducerCommand';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { Producer, ProducerId } from 'src/core/producer/domain/Producer';
import { ICrypt } from 'src/core/shared/application/ICrypt';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { ICache } from 'src/core/shared/application/ICache';

export class DeleteProducerUseCase
  implements UseCase<DeleteProducerCommand, DeleteProducerOutput>
{
  private producerRepository: ProducerRepository;
  private cacheAdapter: ICache<Producer>;
  constructor(
    producerRepository: ProducerRepository,
    cacheAdapter: ICache<Producer>,
  ) {
    this.producerRepository = producerRepository;
    this.cacheAdapter = cacheAdapter;
  }
  async execute(
    aCommand: DeleteProducerCommand,
  ): Promise<DeleteProducerOutput> {
    const producerId = new ProducerId(aCommand.producerId);

    const producer = await this.producerRepository.findById(producerId);

    if (!producer) {
      throw new NotFoundError('Producer dont exists');
    }

    if (!producer.getIsActive()) {
      throw new NotFoundError('Producer dont exists');
    }

    producer.deactive();

    await this.producerRepository.update(producer);
    await this.cacheAdapter.delete(`producer:${aCommand.producerId}`);

    return;
  }
}

export type DeleteProducerOutput = void;
