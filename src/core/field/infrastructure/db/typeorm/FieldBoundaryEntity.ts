import { Coordinate, FieldBoundary } from "src/core/field/domain/FieldBoundaryVo";
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, JoinColumn, OneToOne, Polygon, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'field_boundaries' })
export class FieldBoundaryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Index({ spatial: true })
    @Column('geometry', {
        spatialFeatureType: 'Polygon',
        srid: 4326,
        name: 'boundary',
  })
  boundary: Polygon;
  
  @OneToOne(() => require("./FieldEntity").FieldEntity, (field:any) => field.boundary, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'field_id' }) 
  field: any;
  
  @BeforeInsert()
  @BeforeUpdate()
  private validateAndCompute() {
      const coords = this.boundary.coordinates[0].map(([lng, lat]) => ({
          lat,
          lng,
        }));
        
        const result = FieldBoundary.create(coords);
        if (result.isFail()) {
            throw result.error;
        }
        
        const vo = result.ok;
        
        this.boundary = {
            type: 'Polygon',
            coordinates: [vo['points'].map((p) => [p.lng, p.lat])],
    };
  }
  
  toDomain(): FieldBoundary {
      const coords = this.boundary.coordinates[0].map(([lng, lat]) => ({
          lat,
          lng,
        }));
        
        const result = FieldBoundary.create(coords);
        if (result.isFail()) {
            throw result.error;
        }
        return result.ok;
    }
    
    static fromDomain(vo: Coordinate[]): FieldBoundaryEntity {
        const entity = new FieldBoundaryEntity();
        entity.boundary = {
            type: 'Polygon',
            coordinates: [vo.map((p:Coordinate) => [p.lng, p.lat])],
        };
        return entity;
    }
}
