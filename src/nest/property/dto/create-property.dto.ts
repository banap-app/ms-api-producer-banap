import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'UUID of the property owner',
    example: '8a0a3d3a-2674-40d0-bc51-8be4973eadf7',
  })
  producerId: string;

  @ApiProperty({
    description: 'Name of the property',
    example: 'Banana farm',
  })
  name: string;

  @ApiProperty({
    description: 'Indicates whether the property is active',
    example: true,
  })
  isActive: boolean;
}
