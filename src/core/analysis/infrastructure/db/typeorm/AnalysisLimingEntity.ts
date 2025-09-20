//import { AnalysisEntity } from './AnalysisEntity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type AnalysisLimingEntityProps = {
  analysisLimingId?: string;
  analysisId: string;
  desiredBaseSaturation: number;
  currentBaseSaturation: number;
  totalCationExchangeCapacity: number;
  relativeTotalNeutralizingPower: number;
  liming?: number;
};

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

  static fromDomain(props: AnalysisLimingEntityProps): AnalysisLimingEntity {
    const entity = new AnalysisLimingEntity();
    entity.desiredBaseSaturation = props.desiredBaseSaturation;
    entity.currentBaseSaturation = props.currentBaseSaturation;
    entity.totalCationExchangeCapacity = props.totalCationExchangeCapacity;
    entity.relativeTotalNeutralizingPower =
      props.relativeTotalNeutralizingPower;
    entity.liming = props.liming;
    return entity;
  }
}
