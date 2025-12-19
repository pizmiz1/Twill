import { UserDto } from "./userdto";

export interface OtpDto extends UserDto {
  otp: string;
}
