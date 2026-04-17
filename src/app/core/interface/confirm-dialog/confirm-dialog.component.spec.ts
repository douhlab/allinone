import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  let dialogRefMock: any;

  const dialogDataMock = {
    message: 'Are you sure?',
    title: 'Confirm',
    confirmText: 'Yes'
  };

  beforeEach(async () => {
    dialogRefMock = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ basic creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ data injection
  it('should receive dialog data', () => {
    expect(component.data.message).toBe('Are you sure?');
    expect(component.data.title).toBe('Confirm');
    expect(component.data.confirmText).toBe('Yes');
  });

  // ✅ confirm action
  it('should close dialog with true on confirm()', () => {
    component.confirm();

    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  // ✅ cancel action
  it('should close dialog with false on cancel()', () => {
    component.cancel();

    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});
