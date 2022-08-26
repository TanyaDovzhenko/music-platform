import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserProfileInput {
    @Field({ nullable: true })
    id?: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field({ nullable: true })
    status?: string;
}
