import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
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
