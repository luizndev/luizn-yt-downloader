import { IsIn, IsOptional, IsString } from 'class-validator';

export class DownloadQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(['mp3', 'mp4'])
  format: 'mp3' | 'mp4' = 'mp3';
}
