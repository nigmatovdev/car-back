import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Service title',
    example: 'Basic Car Wash',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Service description',
    example: 'Exterior wash and dry',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Service price',
    example: 25.99,
    type: Number,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({
    description: 'Service duration in minutes',
    example: 30,
    default: 30,
    minimum: 1,
    maximum: 480,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(480)
  @Type(() => Number)
  durationMin?: number;

  @ApiPropertyOptional({
    description: 'Whether the service is active',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;
}

