import { Producer, ProducerId } from 'src/core/producer/domain/Producer';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  ProducerOutput,
  ProducerOutputMapper,
} from '../../commons/ProducerOutputMapper';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { ICache } from 'src/core/shared/application/ICache';
import { Password } from 'src/core/producer/domain/PasswordVo';

export class GetProducerUseCase
  implements UseCase<GetProducerCommand, GetProducerOutput>
{
  private producerRepository: ProducerRepository;
  private cacheAdapter: ICache<Producer>;

  constructor(producerRepository: ProducerRepository, cacheAdapter: ICache<Producer>) {
    this.producerRepository = producerRepository;
    this.cacheAdapter = cacheAdapter
  }

  async execute(aCommand: GetProducerCommand): Promise<GetProducerOutput> {

    if(await this.cacheAdapter.isCacheaded(`producer:${aCommand.producerId}`)) {
      console.log('cachead')
      const cache = await this.cacheAdapter.get(`producer:${aCommand.producerId}`)

      const producer = new Producer({
        producerId: new ProducerId(cache.producerId),
        email: cache.email,
        isActive: cache.isActive,
        name: cache.name,
        password: new Password(cache.password.password),
        typeUser: 2,
        createdAt: cache.createdAt,
        updatedAt: cache.updatedAt,
        deletedAt: cache.deletedAt,
        profilePicture: cache.profilePicture
      })

      producer.validate([])
      if (producer.notification.hasErrors()) {
        throw new EntityValidationError(producer.notification.toJSON());
      }
      
      return ProducerOutputMapper.toOutput(producer);
    }

    const producer = await this.producerRepository.findById(
      new ProducerId(aCommand.producerId),
    );
    
    if (!producer) {
      throw new NotFoundError(
        `Not found a Producer with ID: ${aCommand.producerId}`,
      );
    }
    producer.validate();

    if (!producer.getIsActive()) {
      throw new NotFoundError(
        `Not found a Producer with ID: ${aCommand.producerId}`,
      );
    }

    if (producer.notification.hasErrors()) {
      throw new EntityValidationError(producer.notification.toJSON());
    }
    await this.cacheAdapter.set(producer)
   
    return ProducerOutputMapper.toOutput(producer);
  }
}

export type GetProducerCommand = { producerId: string };

export type GetProducerOutput = ProducerOutput;
