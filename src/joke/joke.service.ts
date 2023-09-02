import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { IJoke } from './interface/joke.interface';
@Injectable()
export class JokeService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetches a random joke from the 'icanhazdadjoke.com' API.
   *
   * @returns {Promise<IJoke>} A promise that resolves to a joke object (of type IJoke) fetched from the API.
   * @throws {AxiosError} Throws an AxiosError if there's an issue with the HTTP request.
   */
  async fetchJoke(): Promise<IJoke> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<IJoke>('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
    return data;
  }
}
