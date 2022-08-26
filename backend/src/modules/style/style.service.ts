import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Style } from './entities/style.entity';
import { AddStyleType } from 'src/types/add-style-type.enum';


@Injectable()
export class StyleService {
    constructor(
        @InjectModel(Style) private styleRepo: typeof Style) { }

    async findAll() {
        return await this.styleRepo.findAll({
            include: { all: true }
        })
    }

    async findOne(id: number) {
        return await this.styleRepo.findByPk(id, { include: { all: true } })
    }

    async addStyle(type: AddStyleType, objId: number, styleId: number) {
        const style = await this.findOne(styleId)
        await style.$add(type, objId)
        return true
    }
}
