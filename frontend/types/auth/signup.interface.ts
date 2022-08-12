import { UserRoles } from "../user/userRoles.enum";

export interface ISignUpDto {
  email: string;
  password: string;
  role: string;
  name: string;
}
