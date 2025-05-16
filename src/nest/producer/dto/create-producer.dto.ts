import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProducerDto {
  @ApiProperty({
    description: 'Name of the producer',
    example: 'João da Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the producer',
    example: 'joao.silva@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password for the producer account',
    example: 'Password123!',
  })
  password: string;

  @ApiProperty({
    description: 'Indicates whether the producer is active',
    example: true,
  })
  isActive: boolean;

  @ApiPropertyOptional({
    description: 'Optional profile picture metadata',
    example: {
      raw_name: 'profile.jpg',
      mime_type: 'image/jpeg',
      size: 204800,
    },
  })
  profilePicture?: {
    raw_name: string;
    mime_type: string;
    size: number;
  };
}
