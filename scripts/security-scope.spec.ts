import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("security and scope boundary", () => {
  it("contains no runtime secrets, real data, business API, or deployment configuration", () => {
    const trackedFiles = execFileSync("git", ["ls-files"], {
      cwd: process.cwd(),
      encoding: "utf8",
    })
      .split(/\r?\n/)
      .filter(Boolean);

    expect(
      trackedFiles.some(
        (file) => /^\.env(?:\..*)?$/i.test(file) && !file.endsWith(".example"),
      ),
    ).toBe(false);
    expect(
      trackedFiles.some((file) =>
        /(?:^|\/)(?:docker-compose|compose|Dockerfile)|\.(?:pem|key|p12|pfx|dump|sql)$/i.test(
          file,
        ),
      ),
    ).toBe(false);

    const sourceFiles = trackedFiles.filter(
      (file) =>
        /^(?:apps|scripts|\.github)\//.test(file) &&
        !/\.(?:spec|test)\.[^.]+$/i.test(file) &&
        !/README\.md$/i.test(file),
    );
    const source = sourceFiles
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    expect(source).not.toContain("-----BEGIN PRIVATE KEY-----");
    expect(source).not.toMatch(
      /(?:api[_-]?key|access[_-]?token|client[_-]?secret)\s*[:=]\s*["'][A-Za-z0-9+/=]{20,}["']/i,
    );
  });
});
