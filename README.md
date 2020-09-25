# BoilerplateClientAngular

|Branch|Status|
|---|---|
|development|[![Shift3](https://circleci.com/gh/Shift3/boilerplate-client-angular.svg?style=shield&circle-token=f7e07709887f5d8310779f748d524c40756e2f8a)](https://circleci.com/gh/Shift3/boilerplate-client-angular)|
|master|[![Shift3](https://circleci.com/gh/Shift3/boilerplate-client-angular/tree/master.svg?style=shield&circle-token=f7e07709887f5d8310779f748d524c40756e2f8a)](https://circleci.com/gh/Shift3/boilerplate-client-angular/tree/master)|

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

This boilerplate has a [wiki](https://github.com/Shift3/boilerplate-client-angular/wiki) which explains the project and its implementation in much greater detail than the code comments.

- [BoilerplateClientAngular](#boilerplateclientangular)
  - [Staging URL](#staging-url)
  - [Deployment](#deployment)
    - [Terraform](#terraform)
    - [AWS](#aws)
  - [Development](#development)
    - [Initializing the Project](#initializing-the-project)
    - [Docker](#docker)
    - [CI](#ci)
    - [Local Development](#local-development)
    - [Development server](#development-server)
    - [Development server in IE11](#development-server-in-ie11)
    - [Code scaffolding](#code-scaffolding)
    - [Build](#build)
    - [Staging Build](#staging-build)
    - [Running unit tests](#running-unit-tests)
    - [Running end-to-end tests](#running-end-to-end-tests)
    - [Further help](#further-help)

## Staging URL

<https://boilerplate-client-angular.shift3sandbox.com/>

## Deployment

### Terraform

The AWS configuration **for the sandbox** is handled by Terraform. Terraform needs the AWS credentials which developers should already have or can access through Zoho Vault. The Terraform configuration is separated into modules for each cloud service it sets up.

Terraform also needs the project secrets saved in `project/terraform/terraform.tfvars` with the following structure:

```
profile = ""

application_name = ""

application_description = ""

region = ""

web_domain_name = ""

zone_id = ""

zone_alias_id = ""

iam_s3_bucket_user = ""

cnames = ["", ""]

```

| Secret                  |                                                                                                                                                    Note |
| :---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------: |
| profile                 |                                                                                     This must match the AWS credentials name on the development machine |
| application_name        |                                                                                                     The name of the project (can match the GitHub name) |
| application_description |                                                                                       The description of the project (can match the GitHub description) |
| region                  |                                                                                                                                Get this from Zoho Vault |
| web_domain_name         |                                                                                                  The `application_name` followed by `shift3sandbox.com` |
| zone_id                 |                                                                                                                                Get this from Zoho Vault |
| zone_alias_id           |                                                                                                                                Get this from Zoho Vault |
| iam_s3_bucket_user      |                                                                                                                                Get this from Zoho Vault |
| cnames                  |      [The CNAME records](https://en.wikipedia.org/wiki/CNAME_record). Probably at least `example.shift3sandbox.com` and `www.example.shift3sandbox.com` |

### AWS

Once the AWS sandbox setup has been taken care of by Terraform, the deployment is done via `npm run deploy:staging`.

## Development

### Initializing the Project

If this project is being cloned to start a new project, there are a few things that need to be updated to make it work. The project name will need to be updated in the `package.json`, `angular.json`, `karma.conf.js`, CircleCI `config.yml`, `app.e2e.spec.ts`, `index.html`, `app.component.ts`, and `app.component.spec.ts` files with the new project name. The README also refers to the boilerplate, both in the text and in the CircleCI badges.

The project `environment` files will need to be updated with the path to the APIs. The development `environment.ts` assumes a local development server of `http://localhost:3000`, which might need to be updated.

### Docker

This project can be run through Docker (it is not recommended for involved development because it makes it harder to debug the codebase). Running `docker-compose up` will configure and serve the project locally. It supports hot reloading. (On Windows, `docker-compose` needs access to the drive where the project is located. It should see `C:\` by default but other drives need to be added manually: see [here](https://docs.microsoft.com/en-us/archive/blogs/stevelasker/configuring-docker-for-windows-volumes), [here](https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c) and [here](https://docs.docker.com/compose/env-file/)).

To run the unit test or e2e test servers, run `docker-compose exec client ng test --watch=false --browsers=ChromeHeadlessDocker` or `docker-compose exec client ng e2e --port 4202` respectively while running the above development server.

### CI

This project is configured to work with CircleCI. The CI builds the application, runs tests, and runs the linter. All of these jobs need to pass for the CI build to succeed. The config file is found [here](https://github.com/Shift3/boilerplate-client-angular/blob/development/.circleci/config.yml). The project name needs to match the new project name for the builds to succeed.

### Local Development

To work with the project directly, the development machine needs [Angular CLI](https://github.com/angular/angular-cli) installed (which requires `node` and `npm`). The project has been configured to use `yarn` in addition for package dependency management.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Development server in IE11

Run `ng serve --configuration es5` for a dev server that is compatible with IE11. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Staging Build

Run `npm run build-staging` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
