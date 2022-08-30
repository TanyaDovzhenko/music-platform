import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Style } from './entities/style.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedStyle } from './music-styles.seeder';
import { UserStyles } from './entities/user-styles.entity';
import { StyleService } from './style.service';
import { StyleResolver } from './style.resolver';

@Module({
    providers: [StyleService, StyleResolver],
    imports: [SequelizeModule.forFeature([
        Style,
        UserStyles
    ]),
    SeederModule.forFeature([SeedStyle]),
    ],
    exports: [StyleService]
})
export class StyleModule { }
