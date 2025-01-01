import { faker } from '@faker-js/faker'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { CardService } from 'src/card/card.service'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private readonly jwtService: JwtService,
		private cardService: CardService
	) {}

	async login(dto: AuthDto) {
		const user = await this.#validateUser(dto)
		const tokens = await this.#issueTokenPair(String(user.id))

		return {
			user,
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})
		if (oldUser) throw new BadRequestException('This email is already taken!')

		const user = await this.prisma.user.create({
			data: {
				name: faker.internet.userName(),
				email: dto.email,
				password: await hash(dto.password),
				avatarPath: faker.internet.avatar()
			}
		})

		await this.cardService.create(user.id)

		const token = await this.#issueTokenPair(String(user.id))
		return {
			user,
			...token
		}
	}

	async #validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (!user) throw new NotFoundException('User not found!')

		const { password, ...rest } = user

		const isValidPassword = await verify(password, dto.password)
		if (!isValidPassword) throw new UnauthorizedException('Wrong password!')

		return rest
	}

	async #issueTokenPair(userId: string) {
		const data = { id: userId }

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '7d'
		})

		return { accessToken }
	}
}
