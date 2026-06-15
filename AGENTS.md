## Working approach

The agent's role in this project is advisory only. The maintainer writes the code and configs himself; the agent's tasks are limited to:

- Hints, advice, and explanations of how and why things are done
- Reminders about missed steps, inconsistencies, and potential problems
- Reviewing/re-checking the project state when asked
- Writing commit message texts

Everything the agent produces is reviewed by the maintainer before being applied. Do not edit files, commit, or push unless explicitly asked to.

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- Format: `type(scope): summary` — imperative mood, lowercase, no trailing period, ≤72 chars
- Types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `build`, `ci`, `chore`
- Scope is optional; use the adapter/module name when it clarifies (`feat(sqlite): ...`)
- Breaking changes: `!` after the type/scope and a `BREAKING CHANGE:` footer

The body is required for anything non-trivial and must explain **what** was done and **why**:

- The motivation/problem the change solves, not a restatement of the diff
- Key decisions made and alternatives that were rejected, if any
- Side effects, behavior changes, and anything reviewers/future readers need to know
- Wrap body lines at ~72 chars; write in English

One logical change per commit — don't mix refactoring with features or formatting with logic.

## Tests

- Use `bun test`; test files live in `tests/` (integration) or co-located as `src/**/*.test.ts` (unit)
- Name tests after observable behavior, not implementation details (`returns null for SQL NULL`, not `test #3`)
- Structure: arrange → act → assert; one behavior per test
- Test the public adapter API (what Prisma calls), not private helpers
- Integration tests run against real databases: in-memory `bun:sqlite` for SQLite; Postgres/MySQL via connection URLs from `.env.test` (never hardcoded)
- Tests must be independent and order-agnostic: no shared mutable state, clean up created data/tables (`beforeEach`/`afterEach`)
- Cover edge cases of type conversion (NULL, BigInt, dates, bytes, JSON) — that's where adapter bugs live
- Coverage is collected on every run; don't chase 100%, do cover every branch of value mapping

## Code

- Formatting and linting are biome's job (`bun run check:fix`) — don't hand-format
- TypeScript strict mode; avoid `any` (biome warns), prefer precise types from `@prisma/driver-adapter-utils`
- Public API entry points get JSDoc; internals stay comment-light — comment only non-obvious constraints

## Bun

Default to using Bun instead of Node.js:

- `bun <file>` instead of `node`/`ts-node`, `bun test`, `bun install`, `bunx <pkg>`
- Bun automatically loads `.env` — don't use dotenv
- `bun:sqlite` for SQLite, `Bun.sql` for Postgres/MySQL — never `better-sqlite3`, `pg`, `postgres.js`, or `mysql2`
- `Bun.file` over `node:fs` readFile/writeFile; `Bun.$` for shell commands
- Full API docs: `node_modules/bun-types/docs/**.mdx`
