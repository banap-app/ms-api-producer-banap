
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type AnalysisNpkEntityProps = {
  analysisNpkId?: string;
  analysisId: string;
  phosphor: number;
  potassium: number;
  expectedProductivity: number;
  nitrogen: number;
};

@Entity({ name: 'analysis_npk' })
export class AnalysisNpkEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'analysis_npk_id' })
  analysisNpkId: string;

  @OneToOne(
    () => require('./AnalysisEntity').AnalysisEntity,
    (analysis: any) => analysis.liming,
  )
  @JoinColumn({ name: 'analysis_id', referencedColumnName: 'analysisId' })
  analysis: any;

  @Column({ name: 'phosphor', type: 'int' })
  phosphor: number;

  @Column({ name: 'potassium', type: 'int' })
  potassium: number;

  @Column({ name: 'expected_productivity', type: 'float' })
  expectedProductivity: number;

  @Column({ name: 'nitrogen', type: 'float' })
  nitrogen: number;

  static fromDomain(props: AnalysisNpkEntityProps): AnalysisNpkEntity {
    const entity = new AnalysisNpkEntity();
    entity.analysis = { analysisId: props.analysisId };
    entity.phosphor = props.phosphor;
    entity.potassium = props.potassium;
    entity.expectedProductivity = props.expectedProductivity;
    entity.nitrogen = props.nitrogen;
    return entity;
  }
}
