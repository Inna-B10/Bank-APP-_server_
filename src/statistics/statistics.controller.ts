import { Controller, Get } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from '../user/user.decorator'
import { StatisticsService } from './statistics.service'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Get()
	@Auth()
	getMain(@CurrentUser('id') id: number) {
		return this.statisticsService.getMain(id)
	}
}
