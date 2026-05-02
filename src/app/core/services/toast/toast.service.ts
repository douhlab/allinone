import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _messages = new BehaviorSubject<any[]>([]);
  messages$ = this._messages.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const current = this._messages.value;
    this._messages.next([...current, { message, type }]);

    // auto remove after 3s
    setTimeout(() => this.remove(message), 3000);
  }

  remove(message: string) {
    this._messages.next(
      this._messages.value.filter(m => m.message !== message)
    );
  }
}
