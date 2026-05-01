import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveDialogComponent } from './leave-dialog.component';
import { ReactiveFormsModule} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LeaveService } from '../../../services/leave/leave.service';
import { AuthService } from '../../../shared/util/authentication/auth.service';
import { of, BehaviorSubject } from 'rxjs';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

describe('LeaveDialogComponent', () => {
  let component: LeaveDialogComponent;
  let fixture: ComponentFixture<LeaveDialogComponent>;

  let userSubject: BehaviorSubject<any>;
  let authServiceMock: any;

  const leaveServiceMock = {
    getEmployers: jest.fn().mockReturnValue(of([
      { id: 1, name: 'Google' }
    ]))
  };

  const dialogRefMock = {
    close: jest.fn()
  };

  beforeEach(async () => {
    userSubject = new BehaviorSubject<any>({ id: 42 });
    authServiceMock = {
      user$: userSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      declarations: [LeaveDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        MatDatepickerModule
      ],
      providers: [
        provideNativeDateAdapter(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: LeaveService, useValue: leaveServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set userId from auth service', () => {
    expect(component.userId).toBe(42);
  });

  it('should fallback to userId = 1 when user is null', () => {
    userSubject.next(null);

    fixture = TestBed.createComponent(LeaveDialogComponent);
    const comp = fixture.componentInstance;

    fixture.detectChanges();

    expect(comp.userId).toBe(1);
  });

  it('should call close on dialog when close() is called', () => {
    component.close();

    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should NOT submit when form is invalid', () => {
    component.form.reset(); // invalid state

    component.submit();

    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should submit valid form and close dialog with payload', () => {

    component.form.setValue({
      employer: 10,
      leaveDate: '2026-01-01',
      days: 2,
      currentBalance: 5,
      description: 'Vacation',
      note: 'Test note'
    });

    component.submit();

    expect(dialogRefMock.close).toHaveBeenCalledWith({
      userId: 42,
      employerId: 10,
      dateHappened: '2026-01-01',
      numberOfDays: 2,
      description: 'Vacation',
      currentBalance: 5,
      note: 'Test note'
    });
  });
});
