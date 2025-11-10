// src/nest/pest-product/pest-product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Repository } from 'typeorm';

import { PestProductEntity } from 'src/core/pest-product/infrastructure/db/typeorm/PestProductEntity';
import { PestProductTypeOrmRepository } from 'src/core/pest-product/infrastructure/db/typeorm/PestTypeOrmRepository';
import { CreatePestProductUseCase } from 'src/core/pest-product/application/use-cases/create/CreatePestProductUseCase';
import { PestProductEmbrapaGateway } from 'src/core/pest-product/infrastructure/gateway/http/PestProductEmbrapaGateway';
import { PestProductController } from './pest-product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PestProductEntity]),
    HttpModule.register({ timeout: 15000, maxRedirects: 3 }),
  ],
  controllers: [PestProductController],
  providers: [
    // Repo TypeORM
    {
      provide: PestProductTypeOrmRepository,
      useFactory: (repo: Repository<PestProductEntity>) =>
        new PestProductTypeOrmRepository(repo),
      inject: [getRepositoryToken(PestProductEntity)],
    },

    // 👇 registre a CLASSE do gateway (sem factory/sem token)
    PestProductEmbrapaGateway,

    // Use case
    {
      provide: CreatePestProductUseCase,
      useFactory: (
        repo: PestProductTypeOrmRepository,
        gateway: PestProductEmbrapaGateway,
      ) => new CreatePestProductUseCase(gateway, repo),
      inject: [PestProductTypeOrmRepository, PestProductEmbrapaGateway],
    },
  ],
  exports: [PestProductTypeOrmRepository, PestProductEmbrapaGateway],
})
export class PestProductModule {}
