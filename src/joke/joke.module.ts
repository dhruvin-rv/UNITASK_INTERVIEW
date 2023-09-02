import { Module } from '@nestjs/common';
import { JokeService } from './joke.service';
import { JokeController } from './joke.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [JokeService],
  controllers: [JokeController],
})
export class JokeModule {}
