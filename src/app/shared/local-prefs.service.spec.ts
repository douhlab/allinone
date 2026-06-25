import {TestBed} from '@angular/core/testing';
import {LocalPrefsService} from './local-prefs.service';

describe('LocalPrefsService', () => {
  let service: LocalPrefsService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalPrefsService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return fallback when key is missing', () => {
    expect(service.get('missing', 'default')).toBe('default');
  });

  it('should store and retrieve parsed values', () => {
    service.set('theme', { dark: true });

    expect(service.get('theme', { dark: false })).toEqual({ dark: true });
    expect(localStorage.getItem('theme')).toBe(JSON.stringify({ dark: true }));
  });
});
