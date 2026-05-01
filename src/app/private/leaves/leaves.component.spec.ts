import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeavesComponent } from './leaves.component';
import { LeaveService } from '../../services/leave/leave.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/util/authentication/auth.service';
import { of, BehaviorSubject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LeavesComponent', () => {
  let component: LeavesComponent;
  let fixture: ComponentFixture<LeavesComponent>;

  let leaveServiceMock: any;
  let dialogMock: any;
  let authServiceMock: any;
  let userSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    // ✅ fresh subject per test (important!)
    userSubject = new BehaviorSubject({ id: 42 });

    authServiceMock = {
      user$: userSubject.asObservable()
    };

    leaveServiceMock = {
      getLeaves: jest.fn().mockReturnValue(of([])),
      createLeave: jest.fn(),
      deleteLeave: jest.fn()
    };

    dialogMock = {
      open: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [LeavesComponent],
      imports: [MatTableModule, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: LeaveService, useValue: leaveServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeavesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ basic
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ userId from auth
  it('should set userId from auth service', () => {
    expect(component.userId).toBe(42);
  });

  // ✅ loadLeaves
  it('should load leaves on init', () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    leaveServiceMock.getLeaves.mockReturnValue(of(mockData));

    component.loadLeaves();

    expect(leaveServiceMock.getLeaves).toHaveBeenCalledWith(42);
    expect(component.dataSource.data).toEqual(mockData);
  });

  // ✅ openDialog → create leave
  it('should create leave after dialog close with result', () => {
    const dialogResult = {
      employerId: 1,
      numberOfDays: 2
    };

    const savedLeave = { id: 99 };

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(dialogResult)
    });

    leaveServiceMock.createLeave.mockReturnValue(of(savedLeave));

    component.dataSource.data = [{ id: 1 } as any];

    component.openDialog();

    expect(leaveServiceMock.createLeave).toHaveBeenCalledWith(dialogResult);
    expect(component.dataSource.data).toEqual([
      { id: 1 },
      savedLeave
    ]);
  });

  // ✅ openDialog → no result
  it('should NOT create leave if dialog returns undefined', () => {
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(undefined)
    });

    component.openDialog();

    expect(leaveServiceMock.createLeave).not.toHaveBeenCalled();
  });

  // ✅ confirm dialog → YES
  it('should call delete when confirm dialog returns true', () => {
    const row = { id: 5 };

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(true)
    });

    const deleteSpy = jest.spyOn(component, 'delete');

    component.openConfirmDialog(row);

    expect(deleteSpy).toHaveBeenCalledWith(row);
  });

  // ✅ confirm dialog → NO
  it('should NOT call delete when confirm dialog returns false', () => {
    const row = { id: 5 };

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(false)
    });

    const deleteSpy = jest.spyOn(component, 'delete');

    component.openConfirmDialog(row);

    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
