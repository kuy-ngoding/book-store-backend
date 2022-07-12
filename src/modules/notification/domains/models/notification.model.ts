import { Prop, Schema } from '@nestjs/mongoose';
import { NotificationChannel } from '../../enums/notification-channel.enum';

@Schema()
export class Notification {
  public readonly _id: string;

  @Prop({ enum: NotificationChannel, default: NotificationChannel.EMAIL })
  public channel: NotificationChannel;

  @Prop()
  public notificationType: string;

  @Prop()
  public title: string;

  @Prop()
  public content: string;

  @Prop()
  public language: string;

  public createdAt: Date;

  public updatedAt: Date;
}
