import mongoose from "mongoose";
import { UserDto } from "../../../shared/userdto.js";

export interface UserDtoBackend extends UserDto {
  userEmail: string;
  passkey: string;
}

const userSchema = new mongoose.Schema<UserDtoBackend>({
  email: { type: String, required: true, unique: true },
  passkey: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

export default User;
