import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and remove toast messages', () => {
    jest.useFakeTimers();

    service.show('Saved', 'success');

    let latest: any[] = [];
    service.messages$.subscribe(messages => (latest = messages));
    expect(latest).toEqual([{ message: 'Saved', type: 'success' }]);

    jest.advanceTimersByTime(3000);
    expect(latest).toEqual([]);

    jest.useRealTimers();
  });

  it('should remove a specific message', () => {
    service.show('One', 'info');
    service.show('Two', 'error');
    service.remove('One');

    let latest: any[] = [];
    service.messages$.subscribe(messages => (latest = messages));
    expect(latest).toEqual([{ message: 'Two', type: 'error' }]);
  });
});
