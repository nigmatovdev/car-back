import { IsString, IsNotEmpty, IsNumber, IsDateString, Min, Max, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Service ID',
    example: 'uuid',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({
    description: 'Booking latitude',
    example: 40.7128,
    type: Number,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  latitude: number;

  @ApiProperty({
    description: 'Booking longitude',
    example: -74.0060,
    type: Number,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  longitude: number;

  @ApiProperty({
    description: 'Booking date',
    example: '2024-12-25',
    type: String,
    format: 'date',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Booking time',
    example: '14:30',
  })
  @IsString()
  @IsNotEmpty()
  time: string;
}

