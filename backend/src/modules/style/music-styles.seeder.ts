import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Style } from './entities/style.entity';


@Seeder({ model: Style as any, unique: ['name'] })
export class SeedStyle implements OnSeederInit {
    run() {
        const data = [
            { name: "Blues" },
            { name: "Classical" },
            { name: "Pop" },
            { name: "Hip hop" },
            { name: "Rock" },
            { name: "Folk" },
            { name: "Disco" },
            { name: "Independent" },
            { name: "Jazz" },
            { name: "Reggae" },
            { name: "Rap" },
            { name: "Soul" },
            { name: "Country" },
            { name: "Techno" },
            { name: "Other" }
        ];
        return data;
    }

}