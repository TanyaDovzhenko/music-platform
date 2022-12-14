import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTrackInput {
  @Field()
  name: string;

  @Field()
  userProfileId: number;

  @Field()
  albumId?: number;
}
