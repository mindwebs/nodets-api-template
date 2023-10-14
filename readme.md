<!-- Before starting to use this template, find and replace occurences of ABC wit your repo name (case sensitive) -->

<!-- <div align="center">
  <h1>Project ABC</h1>
  <h3>One line description of ABC</a></h3>
</div>

## Contents

-   [Contents](#contents)
-   [Description](#description)
    -   [What's the problem we are trying to solve?](#whats-the-problem-we-are-trying-to-solve)
    -   [How can ABC help?](#how-can-abc-help)
    -   [The idea](#the-idea)
-   [Project structure](#project-structure)
-   [Project roadmap](#project-roadmap)
-   [Getting started](#getting-started)
    -   [Prerequisites](#prerequisites)
        -   [Softwares needed](#softwares-needed)
        -   [Knowledge needed](#knowledge-needed)
    -   [Installing](#installing)
-   [Future Scope](#future-scope)
-   [Built with](#built-with)
-   [Contributing](#contributing)
-   [Authors](#authors)

## Description

\_

### What's the problem we are trying to solve?

\_

### How can ABC help?

\_

### The idea

\_ -->

## Project structure

The current project structure is as follows:

```
/
  ├── .github/                    scripts and configs for github templating and workflows
  ├── .nyc_output/                istanbul coverage output (generated on running npm run cover:test)
  ├── build/                      JS build of the project (generated on running npm run build)
  ├── coverage/                   istanbul coverage report (generated on running npm run cover:report)
  ├── docs/                       code documentation by typedoc (generated on running npm run docs)
  ├── node_modules/               directory that stores generated code of every node module
  ├── scripts/                    deploy scripts
  ├── src/
      ├── config/                 configurations for modules like db, swagger doc, etc go here
      ├── controllers/            controller functions for every route
      ├── dtos/                   data transfer object definitions for cross function object passing
      ├── middlewares/            middlewares for various routes go here
      ├── models/                 database schema / models go here
      ├── repositories/           database calls go here
      ├── routes/                 routes or endpoint definitions go here, routes make calls to controllers
      ├── services/               main business logic implementation
      ├── tests/                  directory for endpoint testing
        ├── fixtures/             for pre-defining data and environments for tests
        ├── integration/          for integration tests using BDD methodology
        ├── utils/                utility functions used for testing go here
      ├── views/                  the frontend of the project in EJS, CSS and js
      ├── utils/                  utility or helper functions go here
      ├── app.ts                  entry point to our express app
  ├── .env.production             environment variables used in the project for prod
  ├── .env.development            environment variables used in the project for dev
  ├── .gitignore                  stores files and directories to be ignored in commits
  ├── .prettierrc                 configuration for prettier to help maintain a common code formatting
  ├── docker-compose.prod.yml     config file to define containers (for prod)
  ├── docker-compose.yml          config file to define containers
  ├── Dockerfile                  Docker commands to create the docker image go here
  ├── package.json                metadata of the project
  ├── package-lock.json           stores version of every package used in the project
  ├── readme.md                   details and instructions about the project go here
  ├── sonar-project.properties    configs for sonarqube, used for code quality analysis
  └── tsconfig.json               typescript configs

```

<!-- ## Project roadmap

\_

## Getting started

\_

### Prerequisites

#### Softwares needed

\_

#### Knowledge needed

\_

### Installing

\_

## Future Scope

\_

## Built with

**Backend:**

-   [Express](https://expressjs.com/) - a NodeJS framework
-   [Mongo DB](https://www.mongodb.com/) and the [Mongoose](https://mongoosejs.com/) DOM
-   [Docker](https//docker.com)

## Contributing

Please read [contributing.md](https://github.com/mindwebs/.github/contributing.md) for details on our code committing guidelines.

## Authors -->
