import { Module } from '@nestjs/common';
import { JokeService } from './joke.service';
import { JokeController } from './joke.controller';
import { HttpModule } from '@nestjs/axios';
import { CryptoService } from 'src/common/services/encryption.service';

@Module({
  imports: [HttpModule],
  providers: [JokeService, CryptoService],
  controllers: [JokeController],
})
export class JokeModule {}
