import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './user.dto'
import { userOutput } from './user.output'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: userOutput
		})

		if (!user) throw new NotFoundException('User not found!')
		return user
	}

	async updateProfile(id: number, dto: UserDto) {
		const isSameUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})

		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email занят')

		const user = await this.prisma.user.findUnique({
			where: {
				id
			}
		})

		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				email: dto.email,
				name: dto.name,
				avatarPath: dto.avatarPath,
				password: dto.password ? await hash(dto.password) : user.password
			},
			select: userOutput
		})
	}

	async getAll(currentUserId: number, searchTerm?: string) {
		return this.prisma.user.findMany({
			select: userOutput,
			where: {
				AND: [
					{
						card: {
							isNot: null
						},
						id: {
							not: currentUserId
						}
					},
					searchTerm
						? {
								OR: [
									{
										name: {
											contains: searchTerm,
											mode: 'insensitive'
										}
									},
									{
										email: {
											contains: searchTerm,
											mode: 'insensitive'
										}
									}
								]
						  }
						: {}
				]
			}
		})
	}
}
