# User Management Application

Welcome to the User Creation Workshop! This workshop will guide you through developing and understanding an application
dedicated to creating users in various ways. The application is built with NestJS and utilizes several key technologies
and practices.

## Prerequisites
1. Docker installed
2. Node.js 18.x installed
3. Git installed

## Quickstart

1. Clone the repository, don't fork it, as we work under the origin `master` branch.
    ```bash
    git clone https://github.com/omermorad/cheq-workshop.git
    ```
2. Run the bootstrap script to install the dependencies and set up the environment.
    ```bash
    npm run bootstrap
    ```
3. Start the application.
    ```bash
    npm run start:dev
    ```
4. Go on and try creating a user using the Swagger UI or the API (http://localhost:8080/api)
5. Create a new feature branch and start working, please use the convention `feature/your-private-name` for the branch
   name.

## Introduction

The core functionality of the application revolves around creating users. It supports four main operations:

Swagger is also enabled for the application, allowing you to interact with the API and test its functionality, browse to
the `http://localhost:8080/api` endpoint to access the Swagger UI.

- **POST /user**: Creates a user based on a defined schema.
- **POST /user/random**: Creates a user either from a dummy API or using Faker.js. The strategy (FAKE, DUMMY, or
  ARBITRARY for a random choice) is determined by the `x-random-user-strategy` header.
- **GET /user/:id**: Retrieves a user by their ID.
- **GET /user**: Retrieves all users.

### Key Technologies

- **Database**: PostgreSQL
- **Framework**: NestJS
- **ORM**: [Prisma](https://www.prisma.io/docs/)
- **Async Context Management**: The application uses CLS and async hooks for context management. Learn more
  about [CLS](https://www.npmjs.com/package/nestjs-cls).

## Testing and CI

The project is set up with GitHub Actions for continuous integration, running lint checks, and both unit and integration
tests. Tests are divided into separate projects for unit and integration tests, allowing for targeted test execution.

Take a look on the `jest.config.ts` file to explore the test configuration. We use two different kind of projects, one
for unit, and one for integration.
Those projects are also running separately in the CI pipeline.

