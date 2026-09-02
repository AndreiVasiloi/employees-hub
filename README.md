# Employee Hub

A learning project for building a realistic full-stack employee leave-management platform with secure, auditable workflows for employees, managers, HR, and administrators.

> Agents: read [AGENTS.md](AGENTS.md) first. It is the authoritative root instruction for this warehouse; skills under `skills/<slug>/SKILL.md` are authoritative within their domain.

## Overview

Employee Hub coordinates discovery and delivery of a focused employee leave-management platform. It is intended to provide a realistic environment for practicing full-stack development, secure multi-tenant design, business rules, testing, deployment, and governed AI-assisted development.

## Stack & Entry Points

Node.js 24.20.0, Angular 22, NestJS 12 with TypeScript, PostgreSQL 18.6,
TypeORM, npm workspaces, Vitest, and Rancher Desktop.

Run these commands from the repository root:

- `npm ci` — install dependencies.
- `npm run format` — format supported source and configuration files.
- `npm run lint` — run API linting and frontend formatting checks.
- `npm run type-check` — type-check both applications.
- `npm test` — run web, workspace, API, and PostgreSQL integration tests.
- `npm run build` — build the Angular and NestJS applications.
- `npm run verify` — run the complete local quality gate.
- `npm run rancher:start` — start Rancher Desktop.
- `npm run db:up` — start PostgreSQL through Rancher Desktop.
- `npm run db:ps` — inspect PostgreSQL status.
- `npm run db:logs` — follow PostgreSQL logs.
- `npm run db:down` — stop PostgreSQL while preserving its local volume.
- `npm run web:start` — start the Angular development server.
- `npm run api:start` — start the NestJS development server.

## Local Database with Rancher Desktop

Rancher Desktop provides the local PostgreSQL service through its Docker-compatible
runtime. Copy `.env.example` to `.env` if you need to override the documented local
defaults; `.env` is ignored by Git.

```text
npm run rancher:start
npm run db:up
npm run db:ps
npm run db:logs
npm run db:down
```

The web and API applications run as host npm processes. Start them from separate
terminals with `npm run web:start` and `npm run api:start`.

## Getting Started

1. Open this folder in your IDE and say **`Let's Flow`** (or `/flow` / `$flow`).
2. Read [AGENTS.md](AGENTS.md) for rules, boundaries, and `dft` usage.
3. Browse the phase directories for context: `signal/`, `explore/`, `govern/`, `evolve/`.

## Where Things Live

- `AGENTS.md` — root instruction for humans and agents.
- `.flow/` — Turbine configuration (`config.toml`, `skills.toml`).
- `skills/` — installed Flow Skills; each has a `SKILL.md`.
- `signal/`, `explore/`, `govern/`, `evolve/` — phase-aligned context.
- `work/` — active task workflow (managed by `dft task …`).

## Tooling

Managed by Turbine (`dft`). See **Tooling** in [AGENTS.md](AGENTS.md) for the full command surface and `Taskfile.yml` integration.

## Contributing

- Use `dft task …` to create and move tasks; manage skills with `dft skills …`. Never edit `work/` stages by hand.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/); see **Commits & Branches** in [AGENTS.md](AGENTS.md) for the change-type table.

## License

<!-- Add your license information here.  The below is the default if no other license is available -->

© 2026 Endava (UK) Limited. All rights reserved.
Endava Confidential and Proprietary. May include Endava trade secrets.
Internal reference / reusable material.
Use is restricted to authorised persons on a need-to-know basis for approved Endava or project purposes.
Do not disclose outside authorised recipients except under applicable confidentiality obligations. See the LICENSE.md file in this repository.
