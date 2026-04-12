import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenComponent } from './forbidden.component';
import {Router} from "@angular/router";

describe('ForbiddenComponent', () => {
  let component: ForbiddenComponent;
  let fixture: ComponentFixture<ForbiddenComponent>;

  let router: any;

  beforeEach(async () => {
    router = {
      navigate: jest.fn(),
      navigateByUrl: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ForbiddenComponent],
      providers: [
        {provide: Router, useValue: router}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForbiddenComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to attemptedUrl when valid', () => {
    Object.defineProperty(window, 'history', {
      value: {
        state: {attemptedUrl: '/dashboard'}
      },
      writable: true
    });

    component.goBack();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should navigate to root when no attemptedUrl', () => {
    Object.defineProperty(window, 'history', {
      value: {
        state: {}
      },
      writable: true
    });

    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should fallback to root when attemptedUrl is invalid', () => {
    Object.defineProperty(window, 'history', {
      value: {
        state: {attemptedUrl: 'http://evil.com'}
      },
      writable: true
    });

    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

});
