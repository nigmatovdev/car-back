import { IsNumber, Min, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TopUpCreditDto {
  @ApiProperty({
    description: 'Amount to add to credit balance',
    example: 100.0,
    minimum: 0.01,
  })
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;
}

