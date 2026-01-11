# Project Overview
This project contains:
- A Next.js web application with basic login functionality.
- A Playwright test suite for the web application (Playwirght tests can be found under the `/tests` directory).

## Local Web App Setup

First, ensure you have Node.js installed (see https://nodejs.org/en/download).

Next, run `npm install` to install all the dependencies.

Finally, run `npm run dev` to start the local development server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Playwright Testing
Once the web app is up and running run the following command `npx playwright install` to ensure playwright browsers are installed locally.

You will also need to create a local **`.env`** file and add `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` variables to it to allow the tests to pick up those variables.
*For the purposes of these tests you can set these variables to be any strings locally as the user will be generated during the test setup in `global-setup.ts`. This step is requred becasue in the pipeline these values come from Github secrets and we want to keep user credentials secure*.

Then you will be able to run tests from your chosen IDE or via a command such as `npx playwright test`.

If using the command above a test report will be generated after the tests have run. You will also be able to find the html report in your IDE under the generated `playwright-report` folder.

## Design Choices and Improvements
### Design Choices
- I decided to use Playwright to as the testing freamwork of choice as it is the one I am most familliar with and it is an ideal choice for reliable end-to-end testing for modern web apps.
- I implemented the tests using a page object model which is the Playwright best practice.
- I made sure to use Playwright locators and web-first assertions in the tests as it is Playwright recommended and help ensure the tests run fast and smoothly.
- I decided to use github secrets and .env to keep test user accounts secure.
- I decided to add a github action so that the tests would run on pull requests and code merges to ensure code was only merged if tests were passing during development.

### Improvements
- In reality a web application wouldn't store user data in local storage, so if this were an actual web application, I would remove adding users to local storage in the global-setup and maybe setup users in a database using API calls.
- Add a script to package.json which would setup the project locally in a single command.
- Add a script/command to pull the Github secrets down into a .env file via a command to save from manually adding to the .env file each time during local development.
