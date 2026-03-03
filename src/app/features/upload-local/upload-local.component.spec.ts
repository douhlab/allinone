import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLocalComponent } from './upload-local.component';

describe('UploadLocalComponent', () => {
  let component: UploadLocalComponent;
  let fixture: ComponentFixture<UploadLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadLocalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
