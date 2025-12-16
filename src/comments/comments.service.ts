import { Injectable } from '@nestjs/common';
import { LivestreamComment } from './comments.type';

@Injectable()
export class CommentsService {
    private comments: LivestreamComment[] = [];

    /**
     * Thêm một bình luận từ livestream
     */
    addComment(comment: LivestreamComment): void {
        this.comments.push(comment);
    }

    /**
     * Lấy tất cả bình luận
     */
    getAllComments(): LivestreamComment[] {
        return this.comments;
    }

    /**
     * Lấy bình luận theo livestream ID
     */
    getCommentsByLiveVideo(liveVideoId: string): LivestreamComment[] {
        return this.comments.filter(c => c.liveVideoId === liveVideoId);
    }

    /**
     * Phân tích bình luận - đếm số lượng
     */
    analyzeCommentCount(): {
        total: number;
        byLiveVideo: Record<string, number>;
    } {
        const byLiveVideo: Record<string, number> = {};
        
        this.comments.forEach(comment => {
            byLiveVideo[comment.liveVideoId] = (byLiveVideo[comment.liveVideoId] || 0) + 1;
        });

        return {
            total: this.comments.length,
            byLiveVideo,
        };
    }

    /**
     * Phân tích từ khóa trong bình luận
     */
    analyzeKeywords(keywords: string[]): Record<string, number> {
        const result: Record<string, number> = {};

        keywords.forEach(keyword => {
            result[keyword] = 0;
        });

        this.comments.forEach(comment => {
            const messageLower = comment.message.toLowerCase();
            keywords.forEach(keyword => {
                if (messageLower.includes(keyword.toLowerCase())) {
                    result[keyword]++;
                }
            });
        });

        return result;
    }

    /**
     * Lấy bình luận gần đây nhất
     */
    getRecentComments(limit: number = 10): LivestreamComment[] {
        return this.comments.slice(-limit).reverse();
    }

    /**
     * Xóa tất cả bình luận (cho testing)
     */
    clearComments(): void {
        this.comments = [];
    }
}
