import { Welcome } from './welcome.component';

describe('Welcome', () => {
  it('should mount', () => {
    cy.mount(Welcome);
  });
});
