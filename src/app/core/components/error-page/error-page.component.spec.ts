import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ErrorPageComponent} from './error-page.component';
import {ActivatedRoute} from "@angular/router";
import {NgModule} from "@angular/core";

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {}}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
