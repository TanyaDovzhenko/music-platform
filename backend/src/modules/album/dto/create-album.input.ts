import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAlbumInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  authorUserProfileId?: number;

  @Field({ nullable: true })
  image?: string;

  // @Field(type => [Int], { nullable: true })
  // musicStylesIds?: number[];
}
