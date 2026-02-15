import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { DownloadService } from './download.service';
import { DownloadQueryDto } from './dto/download-query.dto';
import * as fs from 'fs';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get(':videoId')
  async download(
    @Param('videoId') videoId: string,
    @Query() query: DownloadQueryDto,
    @Res() res: Response,
  ) {
    const filePath = await this.downloadService.downloadVideo(
      videoId,
      query.format,
    );

    res.download(filePath, `${videoId}.${query.format}`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
      fs.unlink(filePath, () => {});
    });
  }
}
