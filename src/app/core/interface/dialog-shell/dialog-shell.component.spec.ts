import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShellComponent } from './dialog-shell.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChangeDetectorRef} from "@angular/core";
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('DialogShellComponent', () => {
  let component: DialogShellComponent;
  let fixture: ComponentFixture<DialogShellComponent>;

  let dialogRef: any;
  let cdr: any;

  TestBed.configureTestingModule({
    declarations: [DialogShellComponent],
    imports: [
      DragDropModule // ✅ REQUIRED
    ],
    providers: [
      { provide: MatDialogRef, useValue: dialogRef },
      { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Title', component: {} } },
      { provide: ChangeDetectorRef, useValue: cdr }
    ]
  });

  beforeEach(async () => {

    dialogRef = {
      close: jest.fn(),
      afterOpened: jest.fn(() => ({
        subscribe: jest.fn()
      })),
      _overlayRef: {
        overlayElement: document.createElement('div')
      }
    };

    cdr = {
      detectChanges: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DialogShellComponent],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: {title: 'Test Title', component: {}}},
        {provide: ChangeDetectorRef, useValue: cdr}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogShellComponent);
    component = fixture.componentInstance;

    // mock ViewChilds
    component.container = {
      createComponent: jest.fn()
    } as any;

    component.drag = {
      setFreeDragPosition: jest.fn()
    } as any;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
