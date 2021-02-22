# BoilerplateClientAngular

| Branch      | Status                                                                                                                                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| development | [![Shift3](https://circleci.com/gh/Shift3/boilerplate-client-angular.svg?style=shield&circle-token=f7e07709887f5d8310779f748d524c40756e2f8a)](https://circleci.com/gh/Shift3/boilerplate-client-angular)                         |
| master      | [![Shift3](https://circleci.com/gh/Shift3/boilerplate-client-angular/tree/master.svg?style=shield&circle-token=f7e07709887f5d8310779f748d524c40756e2f8a)](https://circleci.com/gh/Shift3/boilerplate-client-angular/tree/master) |

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

This boilerplate has a [wiki](https://github.com/Shift3/boilerplate-client-angular/wiki) which explains the project and its implementation in much greater detail than the code comments.

- [BoilerplateClientAngular](#boilerplateclientangular)
  - [Staging URL](#staging-url)
  - [Deployment](#deployment)
    - [Terraform](#terraform)
    - [Local Environment](#local-environment)
    - [AWS](#aws)
  - [Development](#development)
    - [Template Repository](#template-repository)
    - [Initializing the Project](#initializing-the-project)
    - [Locale and Translation](#locale-and-translation)
    - [Prettier](#prettier)
    - [Docker](#docker)
    - [CI](#ci)
    - [Local Development](#local-development)
    - [Webpack Bundle Analyzer](#webpack-bundle-analyzer)
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
profile = "shift3"

region = "us-west-2"

web_domain_name = ""

```

| Secret          |                                                                                             Note |
| :-------------- | -----------------------------------------------------------------------------------------------: |
| profile         |                              This must match the AWS credentials name on the development machine |
| region          |                                                                      This is usually `us-west-2` |
| web_domain_name | This will be the web domain name for the project, an example may be: `example.shift3sandbox.com` |

### Local Environment

After provisioning the AWS instance through Terraform, the project environment variables need to be updated with the new server values.

The `apiRoute` property in `environment.staging.ts` will now need to be filled out with the provisioned sandbox instance.

The `package.json` file needs to be updated with the project name and sandbox S3 bucket: `"deploy:staging": "ng build --prod --configuration=staging && aws s3 sync ./dist/<PROJECT_DIRECTORY_PATH> s3://<AWS_SANDBOX_URL> --profile shift3 --delete"` Replace the brackets and placeholder values with the project values.

### AWS

Deploying to AWS requires having AWS credentials on the machine. The script is set to look for a default AWS profile named `shift3`. Once the AWS sandbox setup has been taken care of by Terraform, the deployment is done via `npm run deploy:staging`.

## Development

### Template Repository

This project is configured as a [template repository](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#about-repository-templates). It creates one commit in the new project based on the template instead of the entire original boilerplate history.

### Initializing the Project

If this project is being cloned to start a new project, there are a few things that need to be updated to make it work. The project name will need to be updated in the `README.md`, `package.json`, `angular.json`, `karma.conf.js`, CircleCI `config.yml`, `app.e2e.spec.ts`, `index.html`, `app.component.ts`, and `app.component.spec.ts` files with the new project name. The README also refers to the boilerplate, both in the text and in the CircleCI badges.

The project `environment` files will need to be updated with the path to the APIs. The development `environment.ts` assumes a local development server of `http://localhost:3000`, which might need to be updated.

After provisioning and before deploying, the `deploy:staging` script in `package.json` needs to be updated, as mentioned [above](#local-environment).

The first steps are to install all of the project requirements above, skipping any you may already have installed. Run `yarn install` .

### Locale and Translation

This project comes with locale and translation support built-in for English, Spanish, Tagalog and Vietnamese languages. If additional languages need to be supported, following steps need to be implemented:

- Rename `transloco-root.module.ts` file to `transloco-root-backup.module.ts`.
- Rename `src/assets/i18n` folder to `src/assets/i18n-backup`.
- Run `ng add @ngneat/transloco`. The yarn install will present a few questions.
- Enter the globally recognized locale codes for all the languages that need to be supported. This list must include all the pre-built languages that need to also be supported.
- Copy all the language JSON files from `i18n-backup` that need to be supported into `i18n` folder, replacing any duplicates.
- Copy the values of _availableLangs_ and _defaultLang_ properties from the `transloco-root.module.ts` into the the `transloco-root-backup.module.ts` and delete `transloco-root.module.ts` file.
- Rename `transloco-root-backup.module.ts` file to `transloco-root.module.ts`.
- When the application is deployed and Transloco is unable to load your language files it might be because you need to use a relative path:
  ```
  getTranslation(langPath: string) {
    return this.http.get(`./assets/i18n/${langPath}.json`);
  }
  ```

If only a subset of built-in languages need to be supported, remove the language codes of unwanted languages from _availableLangs_ property's value in `transloco-root.module.ts`.

### Prettier

This project uses [Prettier](https://prettier.io/) to enforce code style. It is highly opinionated by design with relatively scant options for customization. The thought process behind it is to ignore personal styling preferences and instead embrace consistency. There are `.prettierrc` and `.prettierignore` configuration files to adjust some options. Prettier is also wired up to a [pre-commit hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). This DOES slightly slow down git, as it runs the hook on staged files every time `git commit` is executed.

Prettier can be configured within [editors](https://prettier.io/docs/en/editors.html) so that it formats files on save, which helps minimize any changes the pre-commit hook would need to make.

### Docker

This project can be run through Docker (it is not recommended for involved development because it makes it harder to debug the codebase). Running `docker-compose up` will configure and serve the project locally. It supports hot reloading. (On Windows, `docker-compose` needs access to the drive where the project is located. It should see `C:\` by default but other drives need to be added manually: see [here](https://docs.microsoft.com/en-us/archive/blogs/stevelasker/configuring-docker-for-windows-volumes), [here](https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c) and [here](https://docs.docker.com/compose/env-file/)).

To run the unit test or e2e test servers, run `docker-compose exec client ng test --watch=false --browsers=ChromeHeadlessDocker` or `docker-compose exec client ng e2e --port 4202` respectively while running the above development server.

### CI

This project is configured to work with CircleCI. The CI builds the application, runs tests, and runs the linter. All of these jobs need to pass for the CI build to succeed. The config file is found [here](https://github.com/Shift3/boilerplate-client-angular/blob/development/.circleci/config.yml). The project name needs to match the new project name for the builds to succeed.

### Local Development

To work with the project directly, the development machine needs [Angular CLI](https://github.com/angular/angular-cli) installed (which requires `node` and `npm`). The project has been configured to use `yarn` in addition for package dependency management.

### Webpack Bundle Analyzer

The project includes [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer), which helps developers figure out the size of the project and its webpack dependencies. To use it, type `npm run build:stats` or `yarn run build:stats` in the project's directory in a terminal to create the webpack bundle. Run `npm run analyze` or `yarn run analyze`, and webpack-bundle-analyzer will launch a server and browser window with a visualization of the project bundle size.

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
