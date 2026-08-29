# Monoversal Hub project spec

status: approved

name: monoversalhub

summary: |
  Official Monoversal Hub website build managed by the Monoversal AI Builder framework.

# Usage

- This file is the authoritative spec artifact for the project named `monoversalhub`.
- Every agent MUST read this file and check the `status` field before acting.
- Valid status values: draft, approved, in-progress, done

# Gate

Change `status: draft` → `status: approved` (human) to allow agents to begin the Plan stage.

# Notes

- Human approval is required after Plan. Do not run any downstream agent until the upstream artifact is `approved`.
