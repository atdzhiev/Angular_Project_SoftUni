import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotifierService } from '../services/notifier';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifier = inject(NotifierService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {

      if (err.status === 0) {
        notifier.showError('Network error. Check your connection.');
      }
      else if (err.status === 400) {
        notifier.showError(err.error?.message || 'Invalid request.');
      }
      else if (err.status === 401) {
        notifier.showError('You must be logged in.');
      }
      else if (err.status === 403) {
        notifier.showError('You do not have permission.');
      }
      else if (err.status === 404) {
        notifier.showError('Resource not found.');
      }
      else if (err.status >= 500) {
        notifier.showError('Server error. Please try again later.');
      }
      else {
        notifier.showError('Unexpected error occurred.');
      }

      return throwError(() => err);
    })
  );
};
