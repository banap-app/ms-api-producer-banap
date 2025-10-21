import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  ProducerOutput,
  ProducerOutputMapper,
} from '../commons/ProducerOutputMapper';
import { UpdateProducerCommand } from './UpdateProducerCommand';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { Producer, ProducerId } from 'src/core/producer/domain/Producer';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { ICrypt } from 'src/core/shared/application/ICrypt';
import { TypeUser } from 'src/core/producer/domain/TypeUser';
import { ICache } from 'src/core/shared/application/ICache';
import { Password } from 'src/core/producer/domain/PasswordVo';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

export class UpdateProducerUseCase
  implements UseCase<UpdateProducerCommand, UpdateProducerOutput>
{
  private producerRepository: ProducerRepository;
  private cryptService: ICrypt;
  private cacheAdapter: ICache<Producer>;
  constructor(
    producerRepository: ProducerRepository,
    cryptService: ICrypt,
    cacheAdapter: ICache<Producer>,
  ) {
    this.producerRepository = producerRepository;
    this.cryptService = cryptService;
    this.cacheAdapter = cacheAdapter;
  }

  async execute(
    aCommand: UpdateProducerCommand,
  ): Promise<UpdateProducerOutput> {
    const existsProducer = await this.producerRepository.findById(
      new ProducerId(aCommand.producerId),
    );

    if (!existsProducer) {
      throw new NotFoundError(
        `Producer not exists with ID: ${aCommand.producerId}`,
      );
    }

    const aProducer = new Producer({
      email: aCommand.email,
      isActive: aCommand.isActive,
      name: aCommand.name,
      password: new Password(aCommand.password),
      typeUser: aCommand.typeUser,
      producerId: new ProducerId(aCommand.producerId),
      createdAt: new Date(existsProducer.getCreatedAt()),
      updatedAt: new Date(existsProducer.getUpdatedAt()),
      deletedAt: existsProducer.getDeletedAt()
        ? new Date(existsProducer.getDeletedAt())
        : null,
    });

    if (await this.cacheAdapter.isCached(`producer:${aCommand.producerId}`)) {
      const cache = await this.cacheAdapter.get(
        `producer:${aCommand.producerId}`,
      );
      const cachedProducer = new Producer({
        producerId: new ProducerId(cache.producerId),
        email: cache.email,
        isActive: cache.isActive,
        name: cache.name,
        password: new Password(cache.password),
        typeUser: 2,
        createdAt: new Date(cache.createdAt),
        updatedAt: new Date(cache.updatedAt),
        deletedAt: cache.deletedAt ? new Date(cache.deletedAt) : null,
        profilePicture: cache.profilePicture,
      });

      const [passwordCached, passwordProducer] = [
        cachedProducer.getPassword().getValue,
        aProducer.getPassword().getValue,
      ];

      cachedProducer['password'] = null;
      aProducer['password'] = null;
      existsProducer['password'] = null;

      if (!cachedProducer.equals(aProducer)) {
        aProducer.changePassword(passwordProducer);
        await this.cacheAdapter.delete(`producer:${aCommand.producerId}`);
      } else if (
        !(await this.cryptService.verify(passwordProducer, passwordCached))
      ) {
        aProducer.changePassword(passwordProducer);
        await this.cacheAdapter.delete(`producer:${aCommand.producerId}`);
      } else if (cachedProducer.equals(existsProducer)) {
        return ProducerOutputMapper.toOutput(cachedProducer);
      }
    }

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
    await this.cacheAdapter.set(aProducer);
    return ProducerOutputMapper.toOutput(aProducer);
  }
}

export type UpdateProducerOutput = ProducerOutput;
