import { InputType, Field } from '@nestjs/graphql';
import { UserRoles } from 'src/types/user-roles.enum';
import { IsString, IsEnum, IsEmail } from 'class-validator';


@InputType()
export class CreateUserInput {
    @IsEmail()
    @Field()
    email: string;

    @IsString()
    @Field()
    password: string;

    @IsEnum(UserRoles)
    @Field()
    role: UserRoles;
}