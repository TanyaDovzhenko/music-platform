import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTrackInput {
  @Field()
  name: string;

  @Field()
  userProfileId: number;

  // @Field()
  // albumId: number; NEED

  // @Field(type => [Int], { nullable: true })
  // musicStylesIds?: [number];
}
