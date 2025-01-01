import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class TransferDto {
	@IsNumber()
	amount: number

	@IsString()
	@MinLength(16)
	@MaxLength(16)
	toCardNumber: string
}
