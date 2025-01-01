import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CardModule } from './card/card.module'
import { MediaModule } from './media/media.module'
import { StatisticsModule } from './statistics/statistics.module'
import { TransactionModule } from './transaction/transaction.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		MediaModule,
		CardModule,
		TransactionModule,
		StatisticsModule
	]
})
export class AppModule {}
