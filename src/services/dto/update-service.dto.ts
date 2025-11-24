import { IsString, IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateServiceDto {
  @ApiPropertyOptional({
    description: 'Service title',
    example: 'Premium Car Wash',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Service description',
    example: 'Full service wash with wax',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Service price',
    example: 49.99,
    type: Number,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({
    description: 'Service duration in minutes',
    example: 45,
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
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;
}

