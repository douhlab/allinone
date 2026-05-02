import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToastComponent} from './toast.component';
import {ToastService} from "../../services/toast/toast.service";
import {of} from "rxjs";

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  let toastService: any;

  beforeEach(async () => {
    toastService = {
      messages$: of([
        {type: 'success', message: 'Hello'}
      ])
    };

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        {provide: ToastService, useValue: toastService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should expose messages$ from ToastService', (done) => {
    component.messages$.subscribe(messages => {
      expect(messages).toEqual([
        {type: 'success', message: 'Hello'}
      ]);
      done();
    });
  });

});
