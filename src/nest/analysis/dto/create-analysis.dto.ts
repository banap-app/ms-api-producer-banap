import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnalysisDto {
  @ApiProperty({
    description: 'ID do campo relacionado à análise',
    example: '8a9f3a3e-79bd-4f9f-b672-024f3cc0d6e2',
  })
  fieldId: string;

  @ApiProperty({
    description: 'Indica se a análise está ativa',
    example: true,
  })
  isActive: boolean;

  @ApiPropertyOptional({
    description: 'Tipo da análise (pode ser calagem ou NPK)',
    oneOf: [
      {
        type: 'object',
        properties: {
          type: { type: 'string', example: 'liming' },
          ph: { type: 'number', example: 5.5 },
          baseSaturation: { type: 'number', example: 45 },
        },
      },
      {
        type: 'object',
        properties: {
          type: { type: 'string', example: 'npk' },
          nitrogen: { type: 'number', example: 30 },
          phosphorus: { type: 'number', example: 15 },
          potassium: { type: 'number', example: 25 },
        },
      },
    ],
  })
  typeAnalysis?: any; // Substitua por um tipo union se tiver DTOs separados para Liming e NPK
}
