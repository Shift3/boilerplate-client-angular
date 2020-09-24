import { version } from '../../package.json';

export const environment = {
  production: true,
  name: 'Staging',
  apiRoute: '',
  sentry: {
    DSN: '',
    enabled: true,
    dialogEnabled: true,
  },
  version,
};
