import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddStyleType } from 'src/types/add-style-type.enum';
import { StyleService } from '../style/style.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepo: typeof User,
        private readonly userProfileService: UserProfileService,
        private styleService: StyleService) { }

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const user = await this.userRepo.create({ ...createUserInput })
        const userProfile = await this.userProfileService.createUserProfile(user.id, user.email, user.role)
        await user.update({ userProfileId: userProfile.id })
        await user.save()

        createUserInput.stylesIds?.forEach(async styleId => {
            await this.styleService.addStyle(AddStyleType.USER, user.id, styleId)
        })

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
