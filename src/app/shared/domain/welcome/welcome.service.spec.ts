import { TestBed } from '@angular/core/testing';
import { WelcomeService } from './welcome.service';
import { Department } from './department';

describe('WelcomeService', () => {
  let service: WelcomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomeService);
  });

  it('should retrieve all warehouses', () => {
    const expectedDeps: Department[] = [
      new Department(1, 'ZGA', 'Zgharta'),
      new Department(2, 'EHD', 'Ehden'),
      new Department(3, 'BEI', 'Beirut'),
      new Department(4, 'HAD', 'Hadath'),
      new Department(5, 'BAT', 'Batroune')
    ];

    const result = service.getAllDeps();

    expect(result).equal(expectedDeps);
  });
});
