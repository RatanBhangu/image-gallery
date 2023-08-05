import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true
})
export class User {
  @Prop({
    required: true
  })
  name: string;

  @Prop({
    unique: true,
    required: true
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    required: true,
    select: false
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);