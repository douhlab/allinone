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
      new Department(1, 'ECU', 'Ecublens'),
      new Department(2, 'CHE', 'Cheseaux'),
      new Department(3, 'BRE', 'Bremgarten'),
      new Department(4, 'NEB', 'Nebikon'),
      new Department(5, 'PRA', 'Pratteln')
    ];

    const result = service.getAllDeps();

    expect(result).toEqual(expectedDeps);
  });
});
