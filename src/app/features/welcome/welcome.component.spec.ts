import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LeavesComponent } from './leaves.component';

describe('LeavesComponent', () => {
  let component: LeavesComponent;
  let fixture: ComponentFixture<LeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [LeavesComponent],
      providers: [TranslateService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render welcome message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p#welcome').textContent).toContain("Application 'allinone' is running");
  });

});
