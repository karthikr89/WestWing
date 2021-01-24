# WestWing Automation sample
This project is an example of sample Westwing automation requirement

## Project Description:
* Project setup with Protractor version 5.4.4.
* Makes use of Page Objects.
* Written in Typescript, compiled to ES5 Javascript.
* Page Object classes are in the `./pages` directory and should inherit from `common-page.ts`.
* Specs scripts are in the `./specs` directory, grouped into directory by page or functionality.
* Mock data are in `./data` directory.

## Setup:
* Install [Node](http://nodejs.org) (v10.13.x or later)
* Follow setup steps described [here](http://www.protractortest.org/#/tutorial#setup)
* `npm install` to install the project dependencies
* 'npm install protractor -g' to install protractor globally
* 'npm install webdriver-manager -g' to install webdriver-manager globally
* Now install selenium standalone- `webdriver-manager update`
* In a separate command line window, run `webdriver-manager start` and keep it running.

## Run tests:
* `npm run e2e` - Run tests in the base url
* For multi environments, we can configure the tests as per dev, test, beta, QAS in suites/specs from config.js and passing the required environment data from the respective data files

## Troubleshooting
* run `node -v` and make sure your node version is 6.x.x or greater
* run `java -version` and make sure you have Java Development Kit (JDK) installed. 
* run `npm ls -g --depth=0` and make sure protractor@5.1.2 or later is installed as a global NPM package.
* Make sure you have a local instance of Selenium Server started. If not, run `webdriver-manager start`.
* run `webdriver-manager update` to make sure you have the latest Selenium webdrivers. 
* Delete the `./tmp` directory before running tests to ensure files are fresh.
* On Windows machines, sometimes Chrome browser will hang and seemingly not do anything when starting e2e scripts. Close it and rerun e2e tests.

## Post run results
* Post the e2e script runs, the results will be populated in /test-reports/**
* Open index.html file from the respective folder to view the results
* Screenshots will be attached to the steps that can be viewed from the browser results
"# WestWing" 
