import { ApiResponse } from '@shared/interfaces/backend/response';
import { Observable, take } from 'rxjs';

export function parseMessage<T>() {
  return function (source: Observable<ApiResponse<T>>): Observable<T> {
    return new Observable(subscriber => {
      source.pipe(take(1)).subscribe({
        next(value) {
          const { status, message, data } = value;

          console.log({
            status,
            message,
            data,
          });

          // TODO: Al parsear respuestas del backend con estructura ApiResponse,
          //       se puede mostrar una notificacion aprobechando este pipe.

          subscriber.next(value?.data);
        },
      });
    });
  };
}
