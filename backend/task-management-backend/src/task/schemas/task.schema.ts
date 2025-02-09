import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
