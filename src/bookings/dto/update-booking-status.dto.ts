import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';

export class UpdateBookingStatusDto {
  @ApiProperty({
    description: 'New booking status',
    enum: BookingStatus,
    example: 'ASSIGNED',
  })
  @IsEnum(BookingStatus)
  status: BookingStatus;
}

