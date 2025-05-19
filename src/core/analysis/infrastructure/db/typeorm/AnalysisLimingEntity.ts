//import { AnalysisEntity } from './AnalysisEntity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'analysis_liming' })
export class AnalysisLimingEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'analysis_liming_id' })
  analysisLimingId: string;

  @OneToOne(
    () => require('./AnalysisEntity').AnalysisEntity,
    (analysis: any) => analysis.liming,
  )
  @JoinColumn({ name: 'analysis_id', referencedColumnName: 'analysisId' })
  analysis: any;

  @Column({ name: 'desired_base_saturation', type: 'float' })
  desiredBaseSaturation: number;

  @Column({ name: 'current_base_saturation', type: 'float' })
  currentBaseSaturation: number;

  @Column({ name: 'total_cation_exchange_capacity', type: 'float' })
  totalCationExchangeCapacity: number;

  @Column({ name: 'relative_total_neutralizing_power', type: 'float' })
  relativeTotalNeutralizingPower: number;

  @Column({ name: 'liming', type: 'float', nullable: true })
  liming?: number;

  static fromDomain(domain: any): AnalysisLimingEntity {
    const entity = new AnalysisLimingEntity();
    entity.analysisLimingId = domain.getId?.value;
    entity.analysis = { analysisId: domain.analysisId?.value };
    entity.desiredBaseSaturation = domain.desiredBaseSaturation?.value;
    entity.currentBaseSaturation = domain.currentBaseSaturation?.value;
    entity.totalCationExchangeCapacity =
      domain.totalCationExchangeCapacity?.value;
    entity.relativeTotalNeutralizingPower =
      domain.relativeTotalNeutralizingPower?.value;
    entity.liming = domain.liming?.value;
    return entity;
  }
}
