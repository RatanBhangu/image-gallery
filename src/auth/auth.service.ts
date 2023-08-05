import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from 'lib/common/utility-functions';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<User> | Error> {
    const user = await this.userService.findOne(
      {
        $or: [{ username: { $eq: username } }, { email: { $eq: username } }],
      },
      {},
      {
        // rawResult: true,
        lean: true,
      },
      '+password',
    );
    const hash = await bcrypt.compare(pass, user?.password || '');
    if (user && user.password && hash) {
      const { password, ...result } = user;
      return result;
    } else if (user && user.password && !hash) {
      throw new CustomException(
        { success: false, message: 'Wrong password' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else if (!user) {
      throw new CustomException(
        { success: false, message: "User doesn't exists." },
        HttpStatus.NOT_FOUND,
      );
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      ...user
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
