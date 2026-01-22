# Project Context

## Purpose

Personal portfolio website for Dorian Kolis showcasing biographical information, projects, and blog posts. Built with a focus on simplicity, performance, and minimal bloat.

## Tech Stack

- **Astro 5.x** - Static site generator and primary framework
- **TypeScript** - Type checking and enhanced developer experience
- **ESLint** - Code linting with TypeScript and Astro plugins
- **Prettier** - Code formatting
- **GitHub Actions** - CI/CD deployment pipeline
- **No UI framework** - Plain HTML/CSS/JavaScript for maximum performance

## Project Conventions

### Code Style

- **Formatting**: Prettier with default configuration
  - Enforced via `npm run format`
  - Integrated with ESLint via `eslint-config-prettier`
- **Linting**: ESLint with recommended rules
  - TypeScript recommended rules enabled
  - Astro recommended rules enabled
  - Console logging allowed (`no-console: off`)
  - Unused variables set to warning level
- **Module System**: ES modules (`type: "module"`)
- **File Organization**:
  - Pages in `src/pages/`
  - Components in `src/components/`
  - Layouts in `src/layouts/`
  - Assets in `src/assets/`

### Architecture Patterns

- **File-based routing**: Astro's pages directory convention
- **Component-based architecture**: Reusable `.astro` components
- **Layout system**: Shared layouts for consistent page structure
- **Scoped styling**: Component-scoped CSS within `<style>` tags in Astro files
- **Zero JavaScript by default**: Static HTML generation with optional client-side JS
- **No integrations**: Minimal Astro configuration, no UI framework integrations

### Testing Strategy

No formal testing strategy currently implemented. The project prioritizes simplicity and manual verification.

### Git Workflow

- **Main branch**: `main` - primary development branch
- **Deployment**: Automated via GitHub Actions on push to `deploy` branch
- **Commit style**: Descriptive commit messages following conventional format
- Recent commits show incremental feature additions and configuration updates

## Domain Context

This is a personal website for a Dartmouth College student (Dorian Kolis) studying Electrical (Biomedical) Engineering with interests in engineering, programming, and biology. The site will showcase projects, experience, and blog content related to these domains.

## Important Constraints

- **Performance-focused**: Avoid heavy frameworks and unnecessary JavaScript
- **Simplicity**: Keep the codebase minimal and maintainable
- **Static generation**: All content should be statically generated at build time
- **Modern web standards**: Use modern CSS and JavaScript features

## External Dependencies

- **GitHub Actions**: Automated deployment pipeline
- **Hosting**: GitHub Pages (inferred from workflow)
- **No external APIs or services** currently integrated
