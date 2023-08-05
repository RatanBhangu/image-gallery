import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './images.schema';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Image.name, schema:ImageSchema}]),
    TagsModule
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService]
})
export class ImagesModule {}
