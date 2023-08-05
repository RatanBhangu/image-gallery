import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ratandhillon001:Vdr4TRvvcVqFWb5X@cluster0.3x3dcc7.mongodb.net/image-galary'), UsersModule, ImagesModule, TagsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
