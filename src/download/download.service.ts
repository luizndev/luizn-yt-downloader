import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import ffmpegPath from 'ffmpeg-static';
import ytDlp from 'yt-dlp-exec';

@Injectable()
export class DownloadService {
  private readonly logger = new Logger(DownloadService.name);

  async downloadVideo(videoId: string, format: 'mp3' | 'mp4'): Promise<string> {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const outputPath = path.join(os.tmpdir(), `${videoId}.${format}`);

    this.logger.log(`Starting download for ${videoId} in ${format} format`);

    // Caminho padrão
    let cookiesPath = path.join(process.cwd(), 'cookies.txt');

    // Se vier do .env
    if (process.env.COOKIES_CONTENT) {
      this.logger.log(
        `Found COOKIES_CONTENT env var. Length: ${process.env.COOKIES_CONTENT.length}`,
      );

      const tempCookiesPath = path.join(os.tmpdir(), 'youtube_cookies.txt');

      // Corrige formatação
      const fixedCookies = process.env.COOKIES_CONTENT
        .replace(/^env\s*/i, '')
        .replace(/\\n/g, '\n');

      fs.writeFileSync(tempCookiesPath, fixedCookies, 'utf8');
      cookiesPath = tempCookiesPath;
    } else {
      this.logger.log(`COOKIES_CONTENT not found. Checking: ${cookiesPath}`);
    }

    const hasCookies = fs.existsSync(cookiesPath);
    this.logger.log(`Cookies detected: ${hasCookies} | Path: ${cookiesPath}`);


    const baseOptions: any = {
      output: outputPath,
      ffmpegLocation: path.dirname(ffmpegPath as any),
      noCheckCertificates: true,
      noWarnings: true,
      cookies: hasCookies ? cookiesPath : undefined,
    };

    try {
      if (format === 'mp3') {
        await ytDlp(url, {
          ...baseOptions,
          extractAudio: true,
          audioFormat: 'mp3',
          format: 'bestaudio/best',
        });
      } else {
        await ytDlp(url, {
          ...baseOptions,
          format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
          mergeOutputFormat: 'mp4',
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
