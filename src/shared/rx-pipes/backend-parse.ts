import { HttpStatusCode } from '@angular/common/http';
import { ApiResponse } from '@shared/interfaces/backend/response';
import { Message, MessageService } from 'primeng/api';
import { Observable, take } from 'rxjs';

/* 
Si queremos notificar sobre esta acción con un toast 
hay que pasarle el servicio MessageService desde los effects 
*/
export function parseMessage<T>(
  msgService: MessageService | null = null,
  title: string = 'Shopy'
) {
  return function (source: Observable<ApiResponse<T>>): Observable<T> {
    return new Observable(subscriber => {
      source.pipe(take(1)).subscribe({
        next(value) {
          if (msgService) {
            const message: Message = generateMessage<T>(title, value);
            msgService.add(message);
          }
          subscriber.next(value?.data);
        },
        error(error) {
          if (msgService) {
            const _error = {
              status: error?.error?.status ?? error?.error?.statusCode,
              message: error?.error?.message,
            };

            const message: Message = generateMessage<T>(title, _error);
            msgService.add(message);
          }
          subscriber.error(error);
        },
      });
    });
  };
}

function generateMessage<T>(
  title: string,
  response: ApiResponse<T>
): Message {
  const { message, status } = response;

  // eslint-disable-next-line prettier/prettier
  const severity = {
      [HttpStatusCode.Ok]: 'success',
      [HttpStatusCode.Forbidden]: 'error',
      [HttpStatusCode.InternalServerError]: 'error',
      [HttpStatusCode.BadRequest]: 'error',
    }[status] ?? 'success';

  return {
    key: 'GLOBAL_TOAST',
    severity,
    summary: title,
    detail: message,
  };
}
