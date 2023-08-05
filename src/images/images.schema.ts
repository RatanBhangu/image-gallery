import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

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

  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
}

export const ImageSchema = SchemaFactory.createForClass(Image);