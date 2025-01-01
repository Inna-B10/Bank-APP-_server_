import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	create(arg0: { email: string; password: string; contacts: undefined[] }) {
		throw new Error('Method not implemented.')
	}
	save(newUser: any) {
		throw new Error('Method not implemented.')
	}
	findOne(arg0: { where: { id: any } }) {
		throw new Error('Method not implemented.')
	}
	async onModuleInit() {
		await this.$connect()
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close()
		})
	}
}
