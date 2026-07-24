# ai-agent-config Specification

## Purpose

TBD - created by archiving change cleanup-ai-agent-config. Update Purpose after archive.

## Requirements

### Requirement: Single AI Agent Entry Point

The project SHALL expose exactly one root-level, git-tracked entry-point file (`AGENTS.md`) for AI
coding assistant instructions. This file SHALL point contributors/agents to `openspec/AGENTS.md`
as the authoritative, detailed workflow guide. Tool-specific duplicate entry-point files (e.g. a
separate `CLAUDE.md` with identical content) SHALL NOT be maintained, since modern agents
(including Claude Code) read `AGENTS.md` directly.

#### Scenario: Agent looks for instructions

- **WHEN** an AI coding assistant opens the repository root
- **THEN** it finds a single `AGENTS.md` file directing it to `openspec/AGENTS.md` for detailed
  workflow instructions
- **AND** no duplicate tool-specific instruction file (e.g. `CLAUDE.md`) exists

### Requirement: No Stale Editor/Tooling Artifacts

The repository SHALL NOT retain empty or inert AI/editor-tooling artifacts that carry no
instructional content (e.g. empty scratch directories, IDE plugin migration-state files).

#### Scenario: Repository cleanup audit

- **WHEN** a contributor audits the repo for AI/editor configuration files
- **THEN** no empty `.ai/` directory or JetBrains Copilot migration-state XML files are present
