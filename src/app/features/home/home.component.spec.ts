import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { WelcomeService } from '../../shared/domain/welcome/welcome.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslationLoaderService } from '../../shared/util/translation/app-translation-loader.service';
import { Department } from '../../shared/domain/welcome/department';
import { ApiService } from '../../services/api.service';
import { User } from '../../services/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let welcomeService: WelcomeService;
  let apiServiceMock: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [WelcomeService, TranslationLoaderService, TranslateService, ApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    welcomeService = TestBed.inject(WelcomeService);
    apiServiceMock = TestBed.inject(ApiService);
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

    const users: User[] = [{ id: 1 }, { id: 2 }];
    jest.spyOn(apiServiceMock, 'getUsers').mockResolvedValue(users);
    const deps: Department[] = [
      { id: 1, name: 'Dep 1', label: 'Dep 1' },
      { id: 2, name: 'Dep 2', label: 'Dep 2' }
    ];

    jest.spyOn(welcomeService, 'getAllDeps').mockReturnValue(deps);

    component.ngOnInit();

    expect(component.deps).toEqual(deps);
    expect(welcomeService.getAllDeps).toHaveBeenCalled();
  });
});
