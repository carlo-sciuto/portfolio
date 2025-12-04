# Commit Message Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI/CD configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scope (optional)

The scope should be the name of the package/module affected (e.g., components, hooks, utils).

### Subject

- Use imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize first letter
- No period (.) at the end

### Examples

```bash
feat(components): add certifications section
fix(hero): remove resume download button
docs: update README with setup instructions
style(navbar): format code with prettier
refactor(config): consolidate feature flags
perf(projects): optimize image loading
test(skills): add unit tests for skill matrix
build: upgrade vite to 7.2.5
ci: add husky pre-commit hooks
chore: update dependencies
```

## Pre-commit Hooks

This project uses Husky to run the following checks before each commit:

1. **Lint-staged**: Runs ESLint and Prettier on staged files
2. **Commitlint**: Validates commit message format

If any check fails, the commit will be aborted. Fix the issues and try again.
