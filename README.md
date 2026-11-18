# SauceDemo Playwright Tests

End-to-end UI tests for [SauceDemo](https://www.saucedemo.com), written in TypeScript with Playwright Test. The suite covers login, inventory, product details, cart, and checkout flows. Page objects and shared fixtures are in `src/pages` and `src/fixtures`.

## Requirements

- Node.js (LTS recommended) and npm
- Chromium and Firefox browsers supported by the installed Playwright version
- A SauceDemo test account password

The tests use SauceDemo's `standard_user` by default. Set its password in `USER_PASSWORD` before running the suite.

## Install

```bash
npm ci
npx playwright install chromium firefox
```

On Linux CI or a fresh Linux machine, install the browser system dependencies too:

```bash
npx playwright install --with-deps chromium firefox
```

## Configure

Create a `.env` file in the project root:

```dotenv
USER_PASSWORD=your_saucedemo_password
# Optional; defaults to https://www.saucedemo.com
BASE_URL=https://www.saucedemo.com
```

Alternatively, export these variables in your shell or configure them as CI variables/secrets. `USER_PASSWORD` is required for authentication and authenticated test setup. `.env` is ignored by Git; do not commit credentials.

## Run tests

```bash
# Run the complete suite (Chromium and Firefox)
npm test

# Run tests with a visible browser, one worker, and no retries
npm run test:headed

# Open Playwright's interactive debugger
npm run test:debug

# Run tests tagged @smoke
npm run test:smoke

# Run ESLint
npm run lint
```

To run one spec or filter by test title:

```bash
npx playwright test tests/checkout.spec.ts
npx playwright test --grep "TC-CHK-05"
```

The `setup` project logs in as `standard_user` and saves browser storage state under `.auth/standard-user.json`. Chromium and Firefox tests depend on this setup. The generated authentication state is local and ignored by Git.

## Reports and artifacts

The suite writes an HTML report to `playwright-report/` and test output to `test-results/`:

```bash
npm run report
```

Playwright is configured to save a trace on the first retry, screenshots on failure, and video retained on failure. These files are stored with the test results.

## Continuous integration

GitHub Actions runs the suite on pushes and pull requests to `main` and `master`. Configure `USER_PASSWORD` as a repository secret and optionally `BASE_URL` as a repository variable. The workflow installs Chromium and Firefox, then runs the full Playwright suite.
