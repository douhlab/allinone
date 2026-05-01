import {ComponentFixture, TestBed} from '@angular/core/testing';

import {of} from "rxjs";
import {MarketWidgetComponent} from "./market-widget.component";
import {MarketService} from "../../service/market.service";

describe('MarketWidgetComponent', () => {
  let component: MarketWidgetComponent;
  let fixture: ComponentFixture<MarketWidgetComponent>;

  let marketServiceMock: any;

  beforeEach(async () => {
    marketServiceMock = {
      getTopHeadlines: jest.fn().mockReturnValue(of([]))
    };
    await TestBed.configureTestingModule({
      declarations: [MarketWidgetComponent],
      providers: [
        {provide: MarketService, useValue: marketServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MarketWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
