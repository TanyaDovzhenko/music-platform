import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaylistInput {

  @Field()
  name: string;

  @Field(type => Int)
  authorId: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true, defaultValue: false })
  isDefault?: boolean;

  @Field(() => [Int], { nullable: true })
  tracksIds?: number[];

  @Field(type => [Int], { nullable: true })
  stylesIds?: number[];
}
