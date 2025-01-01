import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { TransactionController } from './transaction.controller'
import { TransactionService } from './transaction.service'

@Module({
	controllers: [TransactionController],
	providers: [TransactionService, PrismaService, UserService],
	exports: [TransactionService]
})
export class TransactionModule {}
