# Change: Clean up disparate AI agent configuration artifacts

## Why

The repo has accumulated redundant and stale AI-assistant-related files: `CLAUDE.md` duplicates
`AGENTS.md` verbatim (unnecessary since any capable agent reads `AGENTS.md`), an empty `.ai/`
directory serves no purpose, and JetBrains' `.idea/copilot.data.migration.*.xml` files are inert
IDE bookkeeping artifacts. Consolidating around a single `AGENTS.md` entry point (which already
points to the authoritative `openspec/` instructions) reduces duplication and confusion for future
maintenance.

## What Changes

- Remove `/CLAUDE.md` (redundant duplicate of `/AGENTS.md`)
- Remove the empty `/.ai/` directory
- Remove stale `.idea/copilot.data.migration.*.xml` files
- Document the single-entry-point convention (`AGENTS.md` -> `openspec/AGENTS.md`) as a capability
  spec so future contributors/agents don't recreate tool-specific duplicates

## Impact

- Affected specs: `ai-agent-config` (new capability)
- Affected code/files: `/CLAUDE.md`, `/.ai/`, `.idea/copilot.data.migration.*.xml`
- No impact on build, runtime, or site behavior
