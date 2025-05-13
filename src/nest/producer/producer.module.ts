import { Module } from '@nestjs/common';  
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ProducerController } from './producer.controller';
import { ProducerEntity, ProfilePictureEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { ProducerTypeOrmRepository } from 'src/core/producer/infrastructure/db/typeorm/ProducerTypeOrmRepository';
import { Repository } from 'typeorm';
import { CreateProducerUseCase } from 'src/core/producer/application/use-cases/create-producer/CreateProducerUseCase';
import { BcryptService } from 'src/core/producer/infrastructure/services/BcryptService';
import { UpdateProducerUseCase } from 'src/core/producer/application/use-cases/update-producer/UpdateProducerUseCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProducerEntity, ProfilePictureEntity]),
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
      useFactory: (
        repo: ProducerTypeOrmRepository,
        crypt: BcryptService,
      ) => new CreateProducerUseCase(repo, crypt),
      inject: [ProducerTypeOrmRepository, BcryptService],
    },
    {
      provide: UpdateProducerUseCase,
      useFactory: (
        repo: ProducerTypeOrmRepository,
        crypt: BcryptService
      ) => new UpdateProducerUseCase(repo, crypt),
      inject: [ProducerTypeOrmRepository, BcryptService]
    }
  ],
})
export class ProducerModule {}
