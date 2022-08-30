import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/modules/user/entities/user.entity";

@ObjectType()
export class AuthResponse {
    @Field()
    access_token: string;

    @Field(() => User)
    user: User;
}
