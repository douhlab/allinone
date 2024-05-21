## Testing

### Unit Tests

Unit tests are for services and components, for example `home.component.spec.ts` and use `jest`.

To run these tests:

`npm test` or `ng test`

And to have coverage info:

`npm run test-coverage`

In order to run only one test or to debug it, just use the features from your IDE (WebStorm or IntelliJ IDEA), as usual.

### End-to-end tests

All e2e tests have been migrated to cypress. Any new e2e test should be written only using cypress.
Reference confluence page related to cypress migration: Migrating+e2e+tests+from+protractor+to+cypress

To open a gui that helps to write the cypress code:

```
npx cypress open
```

To run cypress tests in command line

```
npx cypress run
```

#### e2e testing on Mac

Running the e2e tests on a Mac can fail if your keyboard is in the Swiss French locale...this is because it is not able to correctly enter some special characters into forms on your browser. To fix this you must put your keyboard in English US language before running the e2e tests...seriously!
