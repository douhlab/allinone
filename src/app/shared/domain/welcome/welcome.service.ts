import { Injectable } from '@angular/core';
import { Department} from './department';

@Injectable({ providedIn: 'root' })
export class WelcomeService {
  deps: Department[] = [
    new Department(1, 'ECU', 'Ecublens'),
    new Department(2, 'CHE', 'Cheseaux'),
    new Department(3, 'BRE', 'Bremgarten'),
    new Department(4, 'NEB', 'Nebikon'),
    new Department(5, 'PRA', 'Pratteln')
  ];

  getAllDeps(): Department[] {
    return this.deps;
  }
}
