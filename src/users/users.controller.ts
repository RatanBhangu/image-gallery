import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'lib/common/decorators';
import { User } from './users.schema';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
      ) {}

    @Public()
  @Post('/signup')
  async createUser(
    @Res() response: any,
    @Body() user: User,
  ) {
    return this.userService
      .signup(user)
      .then((newUser) => {
        response.status(HttpStatus.CREATED).json({
          newUser,
          success: true,
        });
      })
      .catch((err: any) => {
        console.error(err);
        if (
          ['MongoError', 'MongoServerError'].includes(err.name) &&
          err.code === 11000
        ) {
          if (err?.keyPattern?.username) {
            // Duplicate username
            return response
              .status(HttpStatus.UNPROCESSABLE_ENTITY)
              .send({ success: false, message: 'Username already exist!' });
          }
          if (err?.keyPattern?.email) {
            // Duplicate username
            return response
              .status(HttpStatus.UNPROCESSABLE_ENTITY)
              .send({ success: false, message: 'Email already exist!' });
          }
        }
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .send({ ...err, message: err.message, success: false });
      });
  }
}
