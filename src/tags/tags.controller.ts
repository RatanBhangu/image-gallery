import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagService: TagsService) {}

  @Post()
  async createTag(@Body() tagData: { name: string }) {
    return await this.tagService.createTag(tagData);
  }
}
