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
import { DeleteAnalysisUseCase } from 'src/core/analysis/application/delete-analysis/DeleteAnalysisUseCase';
import { GetAnalysisUseCase } from 'src/core/analysis/application/retrieve-analysis/get-analysis/GetAnalysisUseCase';
import { ICache } from 'src/core/shared/application/ICache';
import { ICACHE_ANALYSIS } from 'src/core/shared/infrastructure/di/tokens';
import { Analysis } from 'src/core/analysis/domain/Analysis';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnalysisEntity,
      AnalysisNpkEntity,
      AnalysisLimingEntity,
      FieldEntity,
      ProducerEntity,
      PropertyEntity,
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
      useFactory: (
        repo: AnalysisTypeOrmRepository,
        cache: ICache<Analysis>,
      ) => {
        return new CreateAnalysisUseCase(repo, cache);
      },
      inject: [AnalysisTypeOrmRepository, ICACHE_ANALYSIS],
    },

    {
      provide: ListAnalysisUseCase,
      useFactory: (
        analysisRepo: AnalysisTypeOrmRepository,
        fieldRepo: FieldTypeOrmRepository,
        cache: ICache<Analysis>,
      ) => {
        return new ListAnalysisUseCase(analysisRepo, fieldRepo, cache);
      },
      inject: [
        AnalysisTypeOrmRepository,
        FieldTypeOrmRepository,
        ICACHE_ANALYSIS,
      ],
    },

    {
      provide: DeleteAnalysisUseCase,
      useFactory: (
        analysisRepo: AnalysisTypeOrmRepository,
        cache: ICache<Analysis>,
      ) => {
        return new DeleteAnalysisUseCase(analysisRepo, cache);
      },
      inject: [AnalysisTypeOrmRepository, ICACHE_ANALYSIS],
    },
    {
      provide: GetAnalysisUseCase,
      useFactory: (
        analysisRepo: AnalysisTypeOrmRepository,
        cache: ICache<Analysis>,
      ) => {
        return new GetAnalysisUseCase(analysisRepo, cache);
      },
      inject: [AnalysisTypeOrmRepository, ICACHE_ANALYSIS],
    },
  ],
})
export class AnalysisModule {}
