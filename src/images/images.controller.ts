import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Public } from 'lib/common/decorators';
import { join } from 'path';
import { serveReadStream } from 'lib/common/utility-functions';
import constants from 'lib/common/constants';
import { ObjectId } from 'mongoose';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() image: Express.Multer.File, @Res() res: any, @Body('tags') tags: string) {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(image.mimetype)) {
            return res.status(400).json({ error: 'Only image files (jpeg,png,gif) are allowed' });
        }

        const imageFile = await this.imagesService.uploadImage(image, tags);
        console.log(imageFile)
        return res.status(HttpStatus.OK).send({
            success: true,
            data: imageFile,
        });
    }

    @Get('')
    async fetchFiles(
        @Res() res: any,
        @Query('name') name: string,
        @Query('tagId') tagId: ObjectId, 
        @Query('limit') limit: number,
        @Query('page') page: number
    ) {
        let filter: any = {},
            sortQuery: any = {};
        limit = limit ? limit : 10;
        page = page > 0 ? page : 1;
        let skip = (limit * page) - limit;

        if (name) {
            filter = {originalname:{$regex: name, $options: 'i'}}
        }

        if(tagId){
            filter.tags = { $in: tagId }
        }
        sortQuery.createdAt = -1

        const imageFiles = await this.imagesService.findAll(filter, limit, skip, sortQuery);
        res.status(HttpStatus.OK).send({
            success: true,
            files: imageFiles
        });
    }

    @Public()
    @Get('/getfile/:imageId')
    async getAssets(@Req() req: any, @Res() res: any, @Param('imageId') uploadId) {
        if (uploadId) {
            let { filename, fileExtension } = await this.imagesService.findById(uploadId);
            return serveReadStream(
                res,
                join(constants.OTHER_ASSET, filename + fileExtension),
            );
        } else throw new BadRequestException();
    }
}