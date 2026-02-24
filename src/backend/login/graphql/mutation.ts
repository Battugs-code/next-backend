import { User } from "../types/model";
import bcrypt from "bcrypt";
export const AuthMutation = {
  signUp: async (
    _root: any,
    {
      name,
      email,
      password,
      VerifyPassword,
    }: {
      name: string;
      email: string;
      password: string;
      VerifyPassword: string;
    },
  ) => {
    const verifyUser = await User.findOne({ email });
    if (verifyUser) {
      throw new Error("user already exists");
    }
    if (password !== VerifyPassword) {
      throw new Error("Passwords do not match");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    return "sign up success";
  },
  login: async (
    _root: any,
    { email, password }: { email: string; password: string },
  ) => {
    const verifyUser = await User.findOne({ email });
    if (!verifyUser) {
      throw new Error("user or password doesnt match");
    }
    const verifyPassword = await bcrypt.compare(password, verifyUser.password);
    if (!verifyPassword) {
      throw new Error("user or password doesnt match");
    }
    return " login success";
  },
};
