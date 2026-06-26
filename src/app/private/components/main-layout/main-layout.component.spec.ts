import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Subject} from 'rxjs';

import {MainLayoutComponent} from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
      providers: [
        {
          provide: Router,
          useValue: {events: new Subject<unknown>().asObservable()}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            firstChild: {
              snapshot: {data: {}},
              firstChild: null
            }
          }
        },
        {
          provide: Title,
          useValue: {setTitle: jest.fn()}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
