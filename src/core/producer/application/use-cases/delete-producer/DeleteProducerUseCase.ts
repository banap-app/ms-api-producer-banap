import { UseCase } from 'src/core/shared/application/IUseCase';
import { DeleteProducerCommand } from './DeleteProducerCommand';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { ProducerId } from 'src/core/producer/domain/Producer';
import { ICrypt } from 'src/core/shared/application/ICrypt';

export class DeleteProducerUseCase
  implements UseCase<DeleteProducerCommand, DeleteProducerOutput>
{
  private producerRepository: ProducerRepository;
  private cryptService: ICrypt;
  constructor(producerRepository: ProducerRepository, cryptService: ICrypt) {
    this.producerRepository = producerRepository;
    this.cryptService = cryptService;
  }
  async execute(
    aCommand: DeleteProducerCommand,
  ): Promise<DeleteProducerOutput> {
    const producerId = new ProducerId(aCommand.producerId);
    const producer = await this.producerRepository.findById(producerId);
    if (!producer) {
      throw new Error('Producer dont exists');
    }
    producer.deactive();
    await this.producerRepository.update(producer);
    return;
  }
}

export type DeleteProducerOutput = void;
