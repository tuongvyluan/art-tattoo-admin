import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum
export enum Role {
  user = "user",
  admin = "admin",
}
// common interface for JWT and Session
interface IUser extends DefaultUser {
  role?: Role;
  id?: string;
  token?: string;
  fullName?: string;
  studioId?: string;
  avatar?: string;
  studioName?: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}