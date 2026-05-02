import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalPrefsService {

  get<T>(key: string, fallback: T): T {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
