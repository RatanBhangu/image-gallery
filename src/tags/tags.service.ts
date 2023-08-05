import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './tags.schema';
import { Model } from 'mongoose';

@Injectable()
export class TagsService {
    constructor(@InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>) {}

  async createTag(tagData: { name: string }): Promise<Tag> {
    const tag = new this.tagModel(tagData);
    return await tag.save();
  }

  async findOrCreateTag(tagName: string) {
    let tag = await this.tagModel.findOne({ name: tagName });

    if (!tag) {
      tag = new this.tagModel({ name: tagName });
      await tag.save();
    }

    return tag;
  }
}
