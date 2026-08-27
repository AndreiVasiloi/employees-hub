# Step 2 — Skills Check

## Objective

Verify that the warehouse's base skills profile is installed and up to date. If new skills are available, install them. If offline, defer gracefully.

## Entry Criteria

- Step 1 (Project Identity) is complete or deferred
- `dft` CLI is available in the PATH

## Actions

### 2.1 Run Skills Update

Instruct the user:

> "Please run the following command in your terminal:"
>
> ```
> dft skills update
> ```

Wait for the user to share the output.

### 2.2 Interpret Output

Evaluate the output and respond accordingly:

**Case A — Up to date**
```
✓ All skills up to date.
```
Respond: "✓ Skills are up to date — nothing to install. Moving on."

**Case B — New skills installed**
```
✓ Installed: flow.proc.setup (0.1.0)
✓ Installed: flow.util.output-decoration (0.1.0)
...
```
Respond: List the installed skills. "✓ Skills installed successfully. Your warehouse now has the full base profile."

**Case C — Offline / Registry unreachable**
```
✗ Registry unreachable — skills not updated.
```
or any network error

Respond: "⚠ Skills check skipped — registry unreachable (offline or network error). I'll add this to the deferred list. You can run `dft skills update` next time you're online."

Add to deferred list: "2. Skills Check — run `dft skills update` when online"

**Case D — Command not found / dft not installed**

Respond: "⚠ `dft` does not appear to be installed or is not in your PATH. Please install Turbine before continuing. I'll defer the skills check."

Add to deferred list: "2. Skills Check — install `dft` CLI then run `dft skills update`"

**Case E — Auth error / session expired**
```
not authenticated: run 'dft login' first
```
or any `invalid session token` / `401` / `403` error

Respond: "⚠ Your Conduit session has expired or is no longer valid. Please run `dft login` to re-authenticate, then re-run `dft skills update`."

Add to deferred list: "2. Skills Check — run `dft login` then `dft skills update`"

**Case F — Registry unavailable / offline**
```
failed to connect to registry
```
or any `connection refused` / `timeout` / `no such host` error

Respond: "⚠ The skill registry appears to be unreachable. This may be a temporary network issue. I'll defer the skills check — please run `dft skills update` once connectivity is restored."

Add to deferred list: "2. Skills Check — run `dft skills update` when registry is reachable"

### 2.3 Deferral

If the user says "Skip for now" at any point in this step:
- Note in deferred list: "2. Skills Check — run `dft skills update` when ready"
- Proceed to Step 3

## Discussion Point (Governed)

After interpreting the output, confirm:
- "Skills check complete [or deferred]. Ready to move to Step 3 — Integrations?"

## Heuristic (Delegated)

In delegated mode: instruct the user to run `dft skills update`, interpret the output automatically, and proceed without waiting for confirmation. If offline, defer and continue.

## Next Step

Proceed to [03-integrations.md](./03-integrations.md).
