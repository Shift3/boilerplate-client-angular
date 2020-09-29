import { name, version } from '../../package.json';

export const environment = {
  production: true,
  name,
  environment: '',
  apiRoute: '',
  sentry: {
    DSN: '',
    enabled: true,
    dialogEnabled: true,
  },
  version,
};
