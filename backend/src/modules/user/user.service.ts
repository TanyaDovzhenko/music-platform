import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserProfileService } from '../user-profile/user-profile.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepo: typeof User,
        private readonly userProfileService: UserProfileService) { }

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const user = await this.userRepo.create({ ...createUserInput })
        this.userProfileService.createUserProfile(user.id, user.email)
        return user
    }

    async findAll(): Promise<User[]> {
        return await this.userRepo.findAll({
            include: { all: true }, attributes: { exclude: ['password'] }
        })
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepo.findByPk(id,
            { include: { all: true }, attributes: { exclude: ['password'] } })
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepo.findOne({ where: { email: email } })
    }
}
