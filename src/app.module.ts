import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [WebhookModule, CommentsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
