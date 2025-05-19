import { ApiProperty } from '@nestjs/swagger';

export class CoordinateDto {
  @ApiProperty({
    description: 'Latitude do ponto de contorno',
    example: -23.55052,
  })
  lat: number;

  @ApiProperty({
    description: 'Longitude do ponto de contorno',
    example: -46.633308,
  })
  lng: number;
}

export class CreateFieldDto {
  @ApiProperty({
    description: 'ID do produtor proprietário do campo',
    example: '8a9f3a3e-79bd-4f9f-b672-024f3cc0d6e2',
  })
  producerId: string;

  @ApiProperty({
    description: 'ID da propriedade associada ao campo',
    example: 'd2f7b8e4-4c3a-4812-9a1d-5e8f7c6b9a0d',
  })
  propertyId: string;

  @ApiProperty({
    description: 'Nome do campo',
    example: 'Lavoura de Milho Sul',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada do campo',
    example: 'Área dedicada ao cultivo de milho, solo argiloso.',
  })
  description: string;

  @ApiProperty({
    description: 'Tipo de cultivo do campo',
    example: 'corn',
  })
  crop: string;

  @ApiProperty({
    description: 'Indica se o campo está ativo',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Sequência ordenada de coordenadas definindo o polígono de contorno do campo (mínimo 3, máximo 6 pontos)',
    type: [CoordinateDto],
    example: [
      { lat: -23.55052, lng: -46.633308 },
      { lat: -23.55100, lng: -46.634000 },
      { lat: -23.55000, lng: -46.634500 },
    ],
  })
  fieldBoundary: CoordinateDto[];
}
