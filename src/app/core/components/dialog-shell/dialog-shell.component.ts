import {
  Component,
  Inject,
  ViewChild,
  ViewContainerRef,
  AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CdkDrag, CdkDragEnd} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dialog-shell',
  templateUrl: './dialog-shell.component.html',
  styleUrls: ['./dialog-shell.component.scss']
})
export class DialogShellComponent implements AfterViewInit {

  @ViewChild('container', {read: ViewContainerRef})
  container!: ViewContainerRef;

  @ViewChild('drag') drag!: CdkDrag;

  title = '';

  constructor(
    private dialogRef: MatDialogRef<DialogShellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) {
    this.title = data.title;
  }

  ngAfterViewInit() {
    // defer creation to avoid ExpressionChangedAfterItHasBeenCheckedError
    requestAnimationFrame(() => {
      this.container.createComponent(this.data.component);
      this.cdr.detectChanges(); // safe
    });

    // wait until overlay is attached
    this.dialogRef.afterOpened().subscribe(() => {
      const overlayEl = (this.dialogRef as any)._overlayRef?.overlayElement;
      if (overlayEl) {
        this.restorePosition(overlayEl);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  savePosition(event: CdkDragEnd) {
    localStorage.setItem('dialog-pos', JSON.stringify(event.source.getFreeDragPosition()));
  }

  restorePosition(el: HTMLElement) {
    const pos = localStorage.getItem('dialog-pos');
    if (!pos) return;

    const { x, y } = JSON.parse(pos);
    this.drag.setFreeDragPosition({ x, y });

  }
}
