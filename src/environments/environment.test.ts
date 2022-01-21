import * as packageInfo from '../../package.json';
const { name, version } = packageInfo;

export const environment = {
  production: false,
  name: name,
  environment: 'Test',
  apiRoute: 'http://localhost:3000',
  sentry: {
    DSN: '',
    enabled: true,
    dialogEnabled: true,
  },
  testUnit: true,
  testIntegration: true,
  version: version,
};
