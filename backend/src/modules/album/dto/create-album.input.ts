import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAlbumInput {
  @Field(() => [Int], { nullable: true })
  tracksIds: number[];

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  authorUserProfileId: number;

  // @Field(type => [Int], { nullable: true })
  // musicStylesIds?: number[];
}
