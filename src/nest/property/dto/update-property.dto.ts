// dto/update-property.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePropertyDto {
  @ApiProperty({ description: 'ID of the property', example: '7055...baef' })
  propertyId: string;

  @ApiProperty({
    description: 'Name of the property',
    example: 'Banana farm',
    required: false,
  })
  name?: string;
}
