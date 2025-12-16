import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { CommentsService } from '../comments/comments.service';

@Controller('webhooks')
export class WebhookController {
    private readonly VERIFY_TOKEN = 'meatyhamhock';

    constructor(private readonly commentsService: CommentsService) {}

    @Get('')
    verifyWebhook(@Req() req: Request, @Res() res: Response): void {
        console.log('123');
        
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode && token && mode === 'subscribe' && token === this.VERIFY_TOKEN) {
            res.status(HttpStatus.OK).send(challenge);
            console.log('Webhook verified successfully!');
        } else {
            res.status(HttpStatus.FORBIDDEN).send('Verification failed');
            console.log('Webhook verification failed.');
        }
    }

    @Post('')
    handleEvents(@Req() req: Request, @Res() res: Response): void {
        console.log('Webhook event received');
        console.log('headers:', req.headers);   
        console.log('body:', JSON.stringify(req.body, null, 2));
        
        const data = req.body;

        if (data.object === 'page') {
            data.entry.forEach((entry: any) => {
                entry.changes.forEach((element: any) => {
                    // Chỉ nhận comment từ livestream
                    if (element.field === 'feed' && element.value.item === 'post' && element.value.verb === 'add') {
                        const comment = {
                            message: element.value.message,
                            liveVideoId: element.value.live_video_api_id,
                            commentId: element.value.comment_id,
                            timestamp: element.value.created_time ? new Date(element.value.created_time * 1000) : new Date(),
                            senderId: element.value.from?.id,
                            senderName: element.value.from?.name,
                        };
                        this.commentsService.addComment(comment);
                        console.log('✓ Livestream comment received:', comment.message);
                    }
                });
            });
        }

        res.status(200).send('EVENT_RECEIVED');
    }
}
