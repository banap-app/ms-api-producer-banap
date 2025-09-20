import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class LimingAnalysisDto {
  @ApiProperty({
    description: 'Saturação por bases desejada (%)',
    example: 60,
    nullable: true,
  })
  @IsOptional()
  desiredBaseSaturation?: number;

  @ApiProperty({ description: 'Saturação por bases atual (%)', example: 45 })
  currentBaseSaturation: number;

  @ApiProperty({ description: 'CTC a pH 7 (cmolc/dm³)', example: 12 })
  totalCationExchangeCapacity: number;

  @ApiProperty({ description: 'PRNT relativo (%)', example: 80 })
  relativeTotalNeutralizingPower: number;
}

export class NpkAnalysisDto {
  @ApiPropertyOptional({
    description: 'Produtividade esperada (kg/ha)',
    example: 3500,
  })
  expectedProductivity?: number;

  @ApiPropertyOptional({ description: 'Fósforo (P)', example: 12 })
  phosphor?: number;

  @ApiPropertyOptional({ description: 'Potássio (K)', example: 80 })
  potassium?: number;
}

@ApiExtraModels(LimingAnalysisDto, NpkAnalysisDto)
export class CreateAnalysisDto {
  @ApiProperty({
    description: 'ID do campo relacionado à análise',
    example: '8a9f3a3e-79bd-4f9f-b672-024f3cc0d6e2',
    format: 'uuid',
  })
  fieldId: string;

  @ApiProperty({
    description: 'Indica se a análise está ativa',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description:
      'Dados do tipo de análise. Use o objeto de Calagem (LIMING) OU o objeto de NPK.',
    oneOf: [
      { $ref: getSchemaPath(LimingAnalysisDto) },
      { $ref: getSchemaPath(NpkAnalysisDto) },
    ],
  })
  typeAnalysis:
    | {
        desiredBaseSaturation: number;
        currentBaseSaturation: number;
        totalCationExchangeCapacity: number;
        relativeTotalNeutralizingPower: number;
      }
    | {
        expectedProductivity?: number;
        phosphor?: number;
        potassium?: number;
      };
}

