import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotifierService {

  message = signal<string | null>(null);

  showError(msg: string) {
    this.message.set(msg);

    setTimeout(() => {
      this.message.set(null);
    }, 3000);
  }

  showSuccess(msg: string) {
    this.message.set(msg);

    setTimeout(() => {
      this.message.set(null);
    }, 3000);
  }
}

