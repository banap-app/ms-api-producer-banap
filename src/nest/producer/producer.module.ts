import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ProducerController } from './producer.controller';
import {
  ProducerEntity,
  ProfilePictureEntity,
} from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { ProducerTypeOrmRepository } from 'src/core/producer/infrastructure/db/typeorm/ProducerTypeOrmRepository';
import { Repository } from 'typeorm';
import { CreateProducerUseCase } from 'src/core/producer/application/use-cases/create-producer/CreateProducerUseCase';
import { BcryptService } from 'src/core/producer/infrastructure/services/BcryptService';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity, ProfilePictureEntity])],
  controllers: [ProducerController],
  providers: [
    // 1. BcryptService diretamente como provider
    BcryptService,

    // 2. ProducerTypeOrmRepository como provider com factory
    {
      provide: ProducerTypeOrmRepository,
      useFactory: (repo: Repository<ProducerEntity>) => {
        return new ProducerTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(ProducerEntity)],
    },

    // 3. CreateProducerUseCase com factory
    {
      provide: CreateProducerUseCase,
      useFactory: (repo: ProducerTypeOrmRepository, crypt: BcryptService) =>
        new CreateProducerUseCase(repo, crypt),
      inject: [ProducerTypeOrmRepository, BcryptService],
    },
  ],
})
export class ProducerModule {}
