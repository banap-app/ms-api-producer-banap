import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "analysis" })
export class AnalysisEntity {

  @PrimaryGeneratedColumn("uuid", {name: "analysis_id"})
  analysisId: string;

  @Column({ type: "uuid", name:"field_id"})
  fieldId: string

  @Column({ type: "varchar", length: 60 })
  typeAnalysis: string

  @Column({ type: "boolean" })
  isActive: boolean;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @OneToOne(()=> AnalysisNpk)
  @JoinColumn()

}
