import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { CreateAnalysisUseCase } from '../../core/analysis/application/create-analysis/CreateAnalysisUseCase';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisEntity } from '../../core/analysis/infrastructure/db/typeorm/AnalysisEntity';
import { AnalysisNpkEntity } from '../../core/analysis/infrastructure/db/typeorm/AnalysisNpkEntity';
import { AnalysisLimingEntity } from '../../core/analysis/infrastructure/db/typeorm/AnalysisLimingEntity';
import { AnalysisTypeOrmRepository } from '../../core/analysis/infrastructure/db/typeorm/AnalysisTypeOrmRepository';

@Module({
   imports: [
      TypeOrmModule.forFeature([AnalysisEntity, AnalysisNpkEntity, AnalysisLimingEntity]),
    ],
  controllers: [AnalysisController],
  providers: [
    {
      provide: AnalysisTypeOrmRepository,
         useFactory: (repo: Repository<AnalysisEntity>) => {
              return new AnalysisTypeOrmRepository(repo);
            },
            inject: [getRepositoryToken(AnalysisEntity)]
    },
    {
      provide: CreateAnalysisUseCase,
      useFactory: (
        repo: AnalysisTypeOrmRepository) => {
          return new CreateAnalysisUseCase(repo)
        },
        inject:[AnalysisTypeOrmRepository]
      
    }
  ]
})
export class AnalysisModule {}
