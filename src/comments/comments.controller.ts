import { Controller, Get, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * Lấy tất cả bình luận
   * GET /comments
   */
  @Get()
  getAllComments() {
    return {
      comments: this.commentsService.getAllComments(),
      total: this.commentsService.getAllComments().length,
    };
  }

  /**
   * Lấy bình luận của một livestream cụ thể
   * GET /comments/live?videoId=xxx
   */
  @Get('live')
  getCommentsByLiveVideo(@Query('videoId') videoId: string) {
    const comments = this.commentsService.getCommentsByLiveVideo(videoId);
    return {
      videoId,
      comments,
      total: comments.length,
    };
  }

  /**
   * Lấy bình luận gần đây nhất
   * GET /comments/recent?limit=10
   */
  @Get('recent')
  getRecentComments(@Query('limit') limit: string = '10') {
    const parsedLimit = parseInt(limit, 10) || 10;
    return {
      comments: this.commentsService.getRecentComments(parsedLimit),
      limit: parsedLimit,
    };
  }

  /**
   * Phân tích bình luận - thống kê số lượng
   * GET /comments/analysis/count
   */
  @Get('analysis/count')
  analyzeCommentCount() {
    return this.commentsService.analyzeCommentCount();
  }

  /**
   * Phân tích từ khóa
   * GET /comments/analysis/keywords?keywords=tuyệt,tốt,xấu
   */
  @Get('analysis/keywords')
  analyzeKeywords(@Query('keywords') keywordsStr: string) {
    const keywords = keywordsStr ? keywordsStr.split(',').map(k => k.trim()) : [];
    if (keywords.length === 0) {
      return { error: 'Vui lòng cung cấp keywords (tách bằng dấu phẩy)' };
    }
    return {
      keywords,
      analysis: this.commentsService.analyzeKeywords(keywords),
    };
  }
}
