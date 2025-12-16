export interface LivestreamComment {
    message: string;
    liveVideoId: string;
    commentId: string;
    timestamp: Date;
    senderId?: string;
    senderName?: string;
}
