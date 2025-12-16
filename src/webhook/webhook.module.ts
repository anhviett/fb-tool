import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { CommentsService } from '../comments/comments.service';

@Module({
  controllers: [WebhookController],
  providers: [CommentsService],
})
export class WebhookModule {}
