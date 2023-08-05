import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Tag } from 'src/tags/tags.schema';

export type ImageDocument = HydratedDocument<Image>;

@Schema({
    timestamps: true
})
export class Image {
    @Prop()
    filename: string;

    @Prop()
    originalname: string;

    @Prop()
    size: number;

    @Prop({ default: '' })
    fileType: string;

    @Prop({ default: '' })
    fileExtension: string;

    @Prop({
        required: true,
        type: [mongoose.Schema.Types.ObjectId],
        ref: Tag.name,
    })
    tags: mongoose.Schema.Types.ObjectId[];
}

export const ImageSchema = SchemaFactory.createForClass(Image);