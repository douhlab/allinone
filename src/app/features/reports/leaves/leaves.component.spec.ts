import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { WelcomeService } from '../../shared/domain/welcome/welcome.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslationLoaderService } from '../../shared/util/translation/app-translation-loader.service';
import { Department } from '../../shared/domain/welcome/department';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let welcomeService: WelcomeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [HomeComponent],
      providers: [WelcomeService, TranslationLoaderService, TranslateService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    welcomeService = TestBed.inject(WelcomeService);
    fixture.detectChanges();
  });

  it(`should have as title 'allinone'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('allinone');
  });

  it('should render welcome message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p#welcome').textContent).toContain("Application 'allinone' is running");
  });

  it('should fetch deps on ngOnInit', () => {
    const deps: Department[] = [
      { id: 1, name: 'Dep 1', label: 'Dep 1' },
      { id: 2, name: 'Dep 2', label: 'Dep 2' }
    ];

    jest.spyOn(welcomeService, 'getAllDeps').mockReturnValue(deps);

    component.ngOnInit();

    expect(component.deps).toEqual(deps);
  });
});
