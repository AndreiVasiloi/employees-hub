import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("workspace quality baseline", () => {
  it("supports clean install and documented root quality commands", () => {
    const rootPackage = JSON.parse(
      readFileSync(join(process.cwd(), "package.json"), "utf8"),
    ) as { workspaces?: string[]; scripts?: Record<string, string> };

    expect(rootPackage.workspaces).toEqual(["apps/web", "apps/api"]);
    expect(rootPackage.scripts).toMatchObject({
      format: expect.any(String),
      "format:check": expect.any(String),
      lint: expect.any(String),
      "type-check": expect.any(String),
      test: expect.any(String),
      "test:workspace": expect.any(String),
      "test:web": expect.any(String),
      "test:api": expect.any(String),
      build: expect.any(String),
      "rancher:start": expect.any(String),
      "db:up": expect.any(String),
      "db:ps": expect.any(String),
      "db:logs": expect.any(String),
      "db:down": expect.any(String),
      "web:start": expect.any(String),
      "api:start": expect.any(String),
      verify: expect.any(String),
    });
  });

  it("supports the GitHub Actions quality workflow for pull requests and master pushes", () => {
    const workflow = readFileSync(
      join(process.cwd(), ".github", "workflows", "quality.yml"),
      "utf8",
    );

    expect(workflow).toContain("pull_request:");
    expect(workflow).toContain("push:");
    expect(workflow).toContain("branches: [master]");
    expect(workflow).toContain("node-version: 24.20.0");
    expect(workflow).toContain("npm ci");
    expect(workflow).toContain("npm run verify");
  });

  it("supports the documented Rancher Desktop PostgreSQL setup", () => {
    const compose = readFileSync(
      join(process.cwd(), "infra", "compose.yaml"),
      "utf8",
    );
    const readme = readFileSync(join(process.cwd(), "README.md"), "utf8");

    expect(compose).toContain("postgres:18.6-alpine");
    expect(compose).toContain("healthcheck:");
    expect(compose).toContain("employee-hub-postgres:");
    expect(compose).toContain("POSTGRES_PASSWORD: ${DB_PASSWORD");
    expect(readme).toContain("npm run rancher:start");
    expect(readme).toContain("npm run db:up");
    expect(readme).toContain("npm run db:down");
  });
});
