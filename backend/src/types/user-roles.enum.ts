import { registerEnumType } from "@nestjs/graphql";

export enum UserRoles {
    LISTENER = 'Listener',
    MUSICIAN = 'Musician'
}


registerEnumType(UserRoles, {
    name: 'UserRoles',
});