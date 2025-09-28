import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ProducerController } from './producer.controller';
import {
  ProducerEntity,
  ProfilePictureEntity,
  TypeUserEntity,
} from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';

import { ProducerTypeOrmRepository } from 'src/core/producer/infrastructure/db/typeorm/ProducerTypeOrmRepository';
import { Repository } from 'typeorm';
import { CreateProducerUseCase } from 'src/core/producer/application/use-cases/create-producer/CreateProducerUseCase';
import { BcryptService } from 'src/core/producer/infrastructure/services/BcryptService';
import { UpdateProducerUseCase } from 'src/core/producer/application/use-cases/update-producer/UpdateProducerUseCase';
import { DeleteProducerUseCase } from 'src/core/producer/application/use-cases/delete-producer/DeleteProducerUseCase';
import { GetProducerUseCase } from 'src/core/producer/application/use-cases/retrieve-producer/get-producer/GetProducerUseCase';
import { RedisService } from 'src/core/shared/infrastructure/services/RedisService';
import { Producer } from 'src/core/producer/domain/Producer';
import { ICache } from 'src/core/shared/application/ICache';
import { ICACHE_PRODUCER } from 'src/core/shared/infrastructure/di/tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProducerEntity,
      ProfilePictureEntity,
      TypeUserEntity,
    ]),
  ],
  controllers: [ProducerController],
  providers: [
    BcryptService,
    {
      provide: ProducerTypeOrmRepository,
      useFactory: (repo: Repository<ProducerEntity>) => {
        return new ProducerTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(ProducerEntity)],
    },
    {
      provide: CreateProducerUseCase,
      useFactory: (repo: ProducerTypeOrmRepository, crypt: BcryptService) =>
        new CreateProducerUseCase(repo, crypt),
      inject: [ProducerTypeOrmRepository, BcryptService],
    },
    {
      provide: UpdateProducerUseCase,
      useFactory: (repo: ProducerTypeOrmRepository, crypt: BcryptService) =>
        new UpdateProducerUseCase(repo, crypt),
      inject: [ProducerTypeOrmRepository, BcryptService],
    },
    {
      provide: DeleteProducerUseCase,
      useFactory: (repo: ProducerTypeOrmRepository, crypt: BcryptService) =>
        new DeleteProducerUseCase(repo, crypt),
      inject: [ProducerTypeOrmRepository],
    },
    {
      provide: GetProducerUseCase,
      useFactory: (repo: ProducerTypeOrmRepository, cache: ICache<Producer>) =>
        new GetProducerUseCase(repo, cache),
      inject: [ProducerTypeOrmRepository, ICACHE_PRODUCER],
    },
  ],
  exports: [ProducerTypeOrmRepository],
})
export class ProducerModule {}
