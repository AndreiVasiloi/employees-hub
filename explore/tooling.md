# Tooling

## Runtime and languages

- Node.js: latest LTS at project bootstrap; pin the exact version in repository tooling and CI.
- TypeScript: used by both applications; pin the version through the workspace package manifests.

## Applications

- Frontend: Angular.
- Backend: NestJS on Node.js with TypeScript.
- Repository layout: separate frontend and backend applications in one repository.

## Data

- Primary database: PostgreSQL, using the latest supported major release at project bootstrap; pin the exact image version for reproducible environments.

## Testing

- Frontend unit/component tests: Vitest with jsdom, following the current Angular CLI default. `ng test` is the canonical local command.
- Backend unit and integration tests: Jest with `@nestjs/testing`.
- Backend HTTP end-to-end tests: Supertest with Jest and Nest's testing utilities.
- Browser-level tests: to be evaluated during Explore; Playwright is the leading candidate if real-browser coverage is needed.

## Package management and delivery

- Package manager: npm.
- Local infrastructure: Docker and Docker Compose, to be confirmed during solution design.
- Deployment and cluster management: Rancher.

## Explicitly deferred

- Exact Node.js, PostgreSQL, Angular, NestJS, and TypeScript versions will be pinned when the applications are scaffolded.
- CI/CD provider and production hosting details remain to be selected during Explore.
