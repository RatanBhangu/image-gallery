import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Image, ImageDocument } from './images.schema';
import constants from 'lib/common/constants';
import {
    deleteFileFromDisk,
    saveFileToDisk,
  } from 'lib/common/utility-functions';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
    private readonly tagService: TagsService
    ) {}

  async uploadImage(image: Express.Multer.File, tags: string) {
    let filename = Date.now() + '-' + Math.round(Math.random() * 1E9);
    console.log(tags)
    const tagNames = tags.split(',').map(tag => tag.trim());

    // Find or create tags and associate with the image
    const tagData = await Promise.all(tagNames.map(tagName => this.tagService.findOrCreateTag(tagName)));
    console.log(tagData.map(tag => tag._id))
    const imageobj= {
      filename: filename,
      originalname: image.originalname,
      size: image.size,
      fileType: image.mimetype,
      fileExtension:
      image.originalname?.match(constants.GET_FILE_EXTENSION)?.[0] || '',
      tags: tagData.map(tag => tag._id),
    };
    console.log(imageobj)
    let fileDoc = await this.imageModel
      .create(imageobj)
      .then(async (fileData: Image) => {   
        console.log("fileData",fileData)     
        if (
          saveFileToDisk(
            constants.OTHER_ASSET,
            image,
            filename + image.originalname?.match(constants.GET_FILE_EXTENSION)?.[0],
          )
        ) {
          return fileData;
        } else {
          this.imageModel.deleteOne(fileData);
          throw new InternalServerErrorException({
            success: false,
            message: 'Error saving file',
          });
        }
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async findAll(filter, limit, skip, sortQuery) {
    return this.imageModel.find(filter).populate('tags').sort(sortQuery).skip(skip).limit(limit);
  }

  async findById(id: ObjectId) {
    return this.imageModel.findById(id).populate('tags').lean();
  }
}
