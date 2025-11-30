import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PayWithCreditDto {
  @ApiProperty({
    description: 'Booking ID to pay for',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsUUID()
  bookingId: string;
}

