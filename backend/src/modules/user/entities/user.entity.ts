import { Table, Column, Model, DataType, HasOne, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserRoles } from 'src/types/user-roles.enum';
import { IsEmail } from 'class-validator';
import { UserProfile } from 'src/modules/user-profile/entities/user-profile.entity';
import { Style } from 'src/modules/style/entities/style.entity';
import { UserStyles } from 'src/modules/style/entities/user-styles.entity';


@ObjectType()
@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class User extends Model<User>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    @Field(type => Int)
    id: number;

    @IsEmail()
    @Column({ type: DataType.STRING, unique: true })
    @Field()
    email: string;

    @Column({ type: DataType.STRING })
    @Field({ nullable: true })
    password: string;

    @Column({ type: DataType.STRING })
    @Field(type => UserRoles)
    role: UserRoles;

    @HasOne(() => UserProfile)
    @Field(type => UserProfile, { nullable: true })
    userProfile: UserProfile;

    @ForeignKey(() => UserProfile)
    @Column({ type: DataType.INTEGER })
    @Field()
    userProfileId: number;

    @BelongsToMany(() => Style, () => UserStyles)
    @Field(type => [Style])
    styles: Style[];
}
