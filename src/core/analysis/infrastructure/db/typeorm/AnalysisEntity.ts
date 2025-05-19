import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AnalysisLimingEntity } from './AnalysisLimingEntity';
import { AnalysisNpkEntity } from './AnalysisNpkEntity';

@Entity({ name: 'analysis' })
export class AnalysisEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'analysis_id' })
  analysisId: string;

  @Column('uuid', { name: 'field_id' })
  fieldId: string;

  @Column('varchar', { length: 60 })
  typeAnalysis: string;

  @Column('boolean')
  isActive: boolean;

  @Column('timestamp')
  createdAt: Date;

  @Column('timestamp')
  updatedAt: Date;

  @Column('timestamp', { nullable: true })
  deletedAt?: Date;

  // NÃO declara @JoinColumn aqui — o lado filho tem a FK
  @OneToOne(() => AnalysisLimingEntity, (liming) => liming.analysis, {
    cascade: true,
    nullable: true,
  })
  liming?: AnalysisLimingEntity;

  @OneToOne(() => AnalysisNpkEntity, (npk) => npk.analysis, {
    cascade: true,
    nullable: true,
  })
  npk?: AnalysisNpkEntity;
}
