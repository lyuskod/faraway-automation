# Faraway Automation
Welcome to the Faraway E2E Automation repository!
This project is created in terms of Faraway AQE vacancy test task.

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

1. Clone repo:
```
git clone https://github.com/lyuskod/faraway-automation.git
```
2. Open repo and install dependencies:
```
yarn install
```
3. Create `.env` file based on `env.example` file:
```
cp env.example .env
```
4. Provide your own values for the keys inside `.env` file
5. Run e2e tests:
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
3. Run command:
```
yarn start:docker
```

## Run on CI (GitHub Actions)
See: 
- `.github/workflows/e2e-faraway.yml` (GitHub Actions Pipeline)
- `docker-compose.yml`
- `Dockerfile`
