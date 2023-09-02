import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseBody } from '.';

export interface Response {
  status: string | number;
  message: string;
  data: any;
  error: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map(({ status, message, data, error }) => {
        const { PayloadStatus, HttpStatus } = ResponseBody[status]();
        response.status(HttpStatus || 200);
        return {
          status: PayloadStatus || 1,
          message: message || null,
          data: data || null,
          error: error || null,
        };
      }),
    );
  }
}
