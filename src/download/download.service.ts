import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as path from 'path';
import * as os from 'os';
import ffmpegPath from 'ffmpeg-static';
import ytDlp from 'yt-dlp-exec';

@Injectable()
export class DownloadService {
  private readonly logger = new Logger(DownloadService.name);

  async downloadVideo(videoId: string, format: 'mp3' | 'mp4'): Promise<string> {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const outputPath = path.join(os.tmpdir(), `${videoId}.${format}`);

    this.logger.log(`Starting download for ${videoId} in ${format} format`);

    try {
      if (format === 'mp3') {
        await ytDlp(url, {
          extractAudio: true,
          audioFormat: 'mp3',
          output: outputPath,
          ffmpegLocation: path.dirname(ffmpegPath as any),
        });
      } else {
        await ytDlp(url, {
          format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
          mergeOutputFormat: 'mp4',
          output: outputPath,
          ffmpegLocation: path.dirname(ffmpegPath as any),
        });
      }

      this.logger.log(`Download completed: ${outputPath}`);
      return outputPath;
    } catch (error: any) {
      this.logger.error(
        `Error downloading video: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error downloading file');
    }
  }
}
