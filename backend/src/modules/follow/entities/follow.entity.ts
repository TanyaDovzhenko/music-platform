import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';


@ObjectType()
@Table({ tableName: 'follows', createdAt: false, updatedAt: false })
export class Follow extends Model<Follow>{
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @Field(type => Int)
  id: number;

  @ForeignKey(() => User)
  @Field(type => Int)
  @Column({ type: DataType.INTEGER })
  followerId: number;

  @ForeignKey(() => User)
  @Field(type => Int)
  @Column({ type: DataType.INTEGER })
  followedId: number;
}
