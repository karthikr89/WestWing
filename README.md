# WestWing Automation sample
This project is a sample Westwing automation requirement

## Project Description:
* Project setup with Protractor version 7.0.0.
* Makes use of Page Objects.
* Written in Typescript, compiled to ES5 Javascript.
* Page Object classes are in the `./src/pages` directory and should inherit from `common-page.ts`.
* Specs scripts are in the `./src/specs` directory, grouped into directory by page or functionality.
* Mock data are in `./src/data` directory.

## Setup:
* Install [Node](http://nodejs.org) (v14)
* Follow setup steps described [here](http://www.protractortest.org/#/tutorial#setup)
* `npm install` to install the project dependencies
* `npm install protractor -g` to install protractor globally
* `npm install webdriver-manager -g` to install webdriver-manager globally
* Now install selenium standalone- `webdriver-manager update`
* In a separate command line window, run `webdriver-manager start` and keep it running.

## Run tests:
* `npm run e2e` - Runs test in the base url
* For multi environments, we can configure the tests as per different run environments

## Post run results
* Post the e2e script runs, the results will be populated in `./test-reports/**`
* Open `index.html` file from the respective folder to view the results
* Screenshots will be attached to the steps that can be viewed from the browser results
"# WestWing" 

## Docker config
* `DockerFile` holds the docker run steps
* to build the image run `docker build -t westwing .`
* post docker build, to copy/generate reports from container, run `docker-compose up`
