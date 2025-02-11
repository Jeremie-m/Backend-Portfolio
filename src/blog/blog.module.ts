import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';

@Module({
  controllers: [BlogController],
  providers: []
})
export class BlogModule {} 