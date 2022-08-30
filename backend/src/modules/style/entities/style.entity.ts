import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserStyles } from './user-styles.entity';
import { User } from 'src/modules/user/entities/user.entity';


@ObjectType()
@Table({ tableName: 'styles', createdAt: false, updatedAt: false })
export class Style extends Model<Style>{

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @Field(type => Int)
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  name: string;

  @BelongsToMany(() => User, () => UserStyles)
  @Field(type => [User], { nullable: true })
  users: User[];
}
