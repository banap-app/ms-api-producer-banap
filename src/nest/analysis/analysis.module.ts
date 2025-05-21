import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { CreateAnalysisUseCase } from '../../core/analysis/application/create-analysis/CreateAnalysisUseCase';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisEntity } from '../../core/analysis/infrastructure/db/typeorm/AnalysisEntity';
import { AnalysisNpkEntity } from '../../core/analysis/infrastructure/db/typeorm/AnalysisNpkEntity';
import { AnalysisLimingEntity } from '../../core/analysis/infrastructure/db/typeorm/AnalysisLimingEntity';
import { AnalysisTypeOrmRepository } from '../../core/analysis/infrastructure/db/typeorm/AnalysisTypeOrmRepository';
import { FieldEntity } from 'src/core/field/infrastructure/db/typeorm/FieldEntity';
import { ListAnalysisUseCase } from 'src/core/analysis/application/retrieve-analysis/list-analysis/ListAnalysisUseCase';
import { FieldTypeOrmRepository } from 'src/core/field/infrastructure/db/typeorm/FieldTypeOrmRepository';
import { ProducerEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { PropertyEntity } from 'src/core/property/infrastructure/db/typeorm/PropertyEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnalysisEntity,
      AnalysisNpkEntity,
      AnalysisLimingEntity,
      FieldEntity,
      ProducerEntity,
      PropertyEntity
    ]),
  ],
  controllers: [AnalysisController],
  providers: [
    {
      provide: AnalysisTypeOrmRepository,
      useFactory: (repo: Repository<AnalysisEntity>) => {
        return new AnalysisTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(AnalysisEntity)],
    },

    {
      provide: FieldTypeOrmRepository,
      useFactory: (repo: Repository<FieldEntity>) => {
        return new FieldTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(FieldEntity)],
    },

    {
      provide: CreateAnalysisUseCase,
      useFactory: (repo: AnalysisTypeOrmRepository) => {
        return new CreateAnalysisUseCase(repo);
      },
      inject: [AnalysisTypeOrmRepository],
    },

    {
      provide: ListAnalysisUseCase,
      useFactory: (analysisRepo: AnalysisTypeOrmRepository, fieldRepo: FieldTypeOrmRepository) => {
        return new ListAnalysisUseCase(analysisRepo, fieldRepo)
      },
      inject: [AnalysisTypeOrmRepository,FieldTypeOrmRepository]
    }
  ],
})
export class AnalysisModule { }
