# BoilerplateClientAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

## Deployment

### Terraform

The AWS configuration **for the sandbox** is handled by Terraform. Terraform needs the AWS credentials which developers should already have or can access through Zoho Vault.

### AWS

Once the AWS sandbox setup has been taken care of by Terraform, the deployment is done via `npm run deploy:staging`.

## Development

### Docker

This project can be run through Docker (it is not recommended for involved development because it makes it harder to debug the codebase). Running `docker-compose up` will configure and serve the project locally. It supports hot reloading. (On Windows, `docker-compose` needs access to the drive where the project is located. It should see `C:\` by default but other drives need to be added manually: see [here](https://docs.microsoft.com/en-us/archive/blogs/stevelasker/configuring-docker-for-windows-volumes), [here](https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c) and [here](https://docs.docker.com/compose/env-file/)).

To run the unit test or e2e test servers, run `docker-compose exec client ng test --watch=false --browsers=ChromeHeadlessDocker` or `docker-compose exec client ng e2e --port 4202` respectively while running the above development server.

### Local Development

To work with the project directly, the development machine needs [Angular CLI](https://github.com/angular/angular-cli) installed (which requires `node` and `npm`). The project has been configured to use `yarn` in addition for package dependency management.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Development server in IE11

Run `ng serve --configuration es5` for a dev server that is compatible with IE11. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Staging Build

Run `npm run build-staging` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
