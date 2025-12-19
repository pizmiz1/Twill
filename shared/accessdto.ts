import { UserDto } from "./userdto";

export interface AccessDto extends UserDto {
  passkey: string;
}
