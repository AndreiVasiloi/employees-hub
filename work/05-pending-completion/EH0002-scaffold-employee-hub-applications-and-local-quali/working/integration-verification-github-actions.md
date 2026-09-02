# Integration Verification for EH0002

## Current Test

GitHub Actions quality workflow for pull requests and pushes to `master`.

## Integration Status

### Event Consumers

- N/A — the workflow does not consume application events.

### Event Producers

- N/A — the workflow does not publish application events.

### API Consumers and Producers

- N/A — the workflow validates the repository and does not call application APIs.

### Data Persistence

- N/A — the workflow does not connect to PostgreSQL. Database integration is
  covered by the API integration test.

### CI Configuration

- [x] `.github/workflows/quality.yml` is a real workflow file.
- [x] Pull requests targeting `master` trigger the workflow.
- [x] Pushes to `master` trigger the workflow.
- [x] `actions/checkout@v4` checks out the repository.
- [x] `actions/setup-node@v4` configures Node `24.20.0` with npm caching.
- [x] `npm ci` installs from the committed lockfile.
- [x] `npm run verify` runs the aggregate quality gate.
- [x] Workflow permissions are limited to repository contents read access.

## Integration Gaps

GitHub-hosted execution cannot be fully exercised locally without pushing the
workflow to GitHub. The repository-level contract test validates the committed
workflow structure; GitHub Actions remains the final runtime authority.

## Evidence

- `npx vitest run scripts/workspace-quality.spec.ts -t "GitHub Actions quality workflow"`
- `.github/workflows/quality.yml`

