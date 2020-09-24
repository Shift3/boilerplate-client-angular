import { name, version } from '../../package.json';

export const environment = {
  production: true,
  name,
  environment: 'Staging',
  apiRoute: '',
  sentry: {
    DSN: '',
    enabled: true,
    dialogEnabled: true,
  },
  version,
};
