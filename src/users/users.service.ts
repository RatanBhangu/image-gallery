import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
const bcrypt = require('bcrypt');
import { UserCredentials } from 'lib/types/common-types';
import { isEmail } from 'class-validator';
const saltRounds = 10;

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

      async findOne(
        filter: object = {},
        projection: object = {},
        options: object = {},
        selectFeilds: string = '',
      ): Promise<User | undefined | null> {
        return this.userModel
          .findOne(filter, projection, options)
          .select(selectFeilds)
          .lean();
      }

      async signup(
        user: Partial<User>,
      ): Promise<User | Error> {
        const { password } = user;
        const hash = await bcrypt.hash(password, saltRounds);
        user.username = user.username || user.email;
        user.email = user.email || user.username;
        user.email = user.email?.toLowerCase();
        user.username = user.username?.toLowerCase();
        if (!isEmail(user.email)) {
          throw new Error(`'${user.email}' is not a valid email.`);
        }
        user.email = user.email.toLowerCase();
        user.username = user.username.toLowerCase();
        user.password = hash;
        return this.userModel.create(user).then((newUser: UserDocument) => {
          delete newUser.password;
          return newUser;
        });
      }
    
      async login(user: UserCredentials): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
      }
}
