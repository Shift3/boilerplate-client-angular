import { name, version } from '../../package.json';

export const environment = {
  production: false,
  name,
  environment: 'Test',
  apiRoute: 'http://localhost:3000',
  sentry: {
    DSN: '',
    enabled: true,
    dialogEnabled: true,
  },
  testUnit: true,
  testIntegration: true,
  version,
};
