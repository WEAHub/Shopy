import 'jest-preset-angular/setup-jest';

import { configure } from '@testing-library/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import * as defaultTranslation from './src/assets/i18n/es.json';

const _error = console.error;
const excludeErrors: string[] = ['Error: Could not parse CSS stylesheet'];

console.error = function (msg) {
  const excludeThis = !excludeErrors.find(error => error.includes(msg));
  if (excludeThis) _error(msg);
};

configure({
  defaultImports: [
    TranslateTestingModule.withTranslations(
      'es',
      defaultTranslation as never
    ),
  ],
});
