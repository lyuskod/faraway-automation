# Faraway Automation
Welcome to the Faraway E2E Automation repository!

:warning: The `~report/` folder with the local runs' results was published due impossibility to fully run e2e pipeline step on GitHub actions.

Both requested test cases are covered. Please, see the `~report/` folder to find the automation results.

## What's done
1. Automated 2 test cases
2. Added docker-compose.yml & Dockerfile
3. Added github actions pipeline with corresponding steps

# Frontend & Backend containers problem
One of the main purposes for both of the test cases is to check that after we send the `deploy collection` or `mint nft` transactions - we should see the new data arrives under `Events` section.

The `fronted` app works as follows:
- it requests data for `Events` section by calling `http://localhost:4000/events` endpoint which is running as dedicated service
- once it gets this data, then react injects the results inside `Events` section on UI

So we have 2 3rd party services that configured by using `localhost` alias to communicate between each other.

The problem is that it doesn't work on GitHub Actions because docker containers network `localhost` points to `this.container`. 

And when start our services, the `fronted` start asking `backend` on the `localhost` which is impossible.
`Events` section will never be filled because both `frontend` & `backend` services are running in separated containers having `localhost` ipv* address unique for each of them.
In that case `fronted` should send the request to `backend` by the following url:
- `http://{servicename}:4000/events`
But we cant configure that, as I think.

You can download test run artifacts and see the test execution by watching the test runs recordings archived: https://github.com/lyuskod/faraway-automation/actions/runs/5128001025

_To be familiar with this issue, see: [Localhost can not be accessed on Github Actions workflow](https://stackoverflow.com/questions/68691293/localhost-can-not-be-accessed-on-github-actions-workflow)_

# Tooling
1. Test automation framework -> [Synthetixio/synpress](https://github.com/Synthetixio/synpress)
2. Blockchain interactions -> [AlchemySDK](https://github.com/alchemyplatform/alchemy-sdk-js)
3. Conventional commits -> [Commitizen](https://www.npmjs.com/package/commitizen)
4. Package Manager -> [Yarn](https://yarnpkg.com/)

# Requirements
- node >= v19.5.0
- Docker >= 23.0.5 (build bc4487a)

# Let's begin!
## Quick Start
:warning: Before run, please make sure you have both `evercoinx/faraway:nft-collection-deployer-frontend` and `evercoinx/faraway:nft-collection-deployer-backend` docker containers up and running

:warning: Also make sure you have [nodejs](https://nodejs.org/en/download) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed globally

1. Clone repo:
```
git clone https://github.com/lyuskod/faraway-automation.git
```
2. Open repo:
```
cd faraway-automation
```
3. Install dependencies:
```
yarn install
```
4. Create `.env` file based on `env.example` file:
```
cp env.example .env
```
5. Provide your own values for the keys inside `.env` file
(Values are already provided)
6. Run e2e tests:
```
yarn start:local
```

## Reporting
Reports generate automatically by the following path `~projectRoot/report`.
Here you can find:
- `mocha-awesome/videos/` (folder contains test runs videos)
- `mocha-awesome/index.html` (simple html report generated after test run)
- `screenshot` (screenshot folder)
- `videos` (test runs video recordings)

## Configuration
Automation framework configuration file can be found here:
`src/synpress.config.ts`

_For more info visit: [Synthetixio/synpress](https://github.com/Synthetixio/synpress)_

## Run on local via Docker (Automatically)
1. Create `docker.config` file based on `docker.config.example` inside the project root:
```
cp docker.config.example docker.config
```
2. Provide your own values for the keys inside `docker.config` file
(Values are already provided)
3. Run command:
```
yarn start:docker
```

## Run on CI (GitHub Actions)
See: 
- `.github/workflows/e2e-faraway.yml` (GitHub Actions Pipeline)
- `docker-compose.yml`
- `Dockerfile`
