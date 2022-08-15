import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AddTrackInput {

    @Field(() => Int)
    playlistId: number;

    @Field(() => Int)
    trackId: number;
}
