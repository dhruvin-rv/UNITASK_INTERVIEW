import { Controller, Get } from '@nestjs/common';
import { JokeService } from './joke.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RESPONSE } from 'src/common/types/response.type';
import { RESPONSE_TYPE } from 'src/common/enums/global.enum';

@Controller('joke')
@ApiTags('Joke')
export class JokeController {
  constructor(private readonly jokeService: JokeService) {}

  @Get('random-joke')
  @ApiBearerAuth()
  async randomJoke(): Promise<RESPONSE> {
    const joke = await this.jokeService.fetchJoke();
    if (joke) {
      return {
        status: RESPONSE_TYPE.SUCCESS,
        message: 'Joke Found',
        data: joke.joke,
      };
    } else {
      return {
        status: RESPONSE_TYPE.FAIL,
        message: 'Failed to load joke',
      };
    }
  }
}
