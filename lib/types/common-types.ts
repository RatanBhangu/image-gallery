import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import constants from "lib/common/constants";

interface Password { password: string; }
interface UserCredentialsEmail extends Password { email: string; }
interface UserCredentialsUsername extends Password { username: string; }
export type UserCredentials = UserCredentialsEmail | UserCredentialsUsername;