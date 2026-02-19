# versioning in Node

- Node follows semantic versioning (`semVer`) while creating and naming multiple incremental version of the same software
- It breaks teh version into 3 parts / bits [major.minor.patch]

## Major Version

- Introduces breaking changes.
- Backward compatibility is not guaranteed.
- Existing code may stop working.

Examples:

- Changing the response structure of an endpoint.
- Renaming or removing an API route.
- Changing function parameters.

When the major version changes, users may need to update their code.
When major version changes, it resets the minor and patch version to 0.

## Minor Version

- Adds new features.
- Maintains backward compatibility.
- Existing functionality continues to work.

Examples:

- Adding a new endpoint.
- Adding an optional parameter.
- Adding a new feature without modifying existing behavior.

Users do not need to change their existing code.
When minor version changes, it resets the patch version to 0.

## Patch Version

- Used for small updates.
- Mainly for bug fixes.
- Must maintain backward compatibility.
- Does not change the public API.

Examples:

- Fixing internal logic of an endpoint.
- Correcting a validation issue.
- Improving performance without changing:
  - Input format
  - Output format

Users should not need to modify their code after a patch update.

## Version Symbols in package.json

1. ^ (Caret): Allows minor and patch updates but blocks major updates. In `"express": "^4.18.2"` Express is allowed to update minor and patch versions, but not the major version. It installs the latest available version within major version 4.

2. ~ (Tilde): Allows patch updates only. Blocks minor and major updates. In `"express": "~4.18.2"` Express is allowed to update only the patch version, not minor or major versions.

3. No symbol: Restricts usage to only the mentioned exact version.

### Version Update Rules

- When you mention a version, npm will never install a version lower than it.
- It installs that version or a higher compatible version based on the symbol.
- Caret `^` allows minor and patch updates.
- Tilde `~` allows only patch updates.
- No symbol means use the exact version only.

## NPMJS

- npmjs.com is the central registry for publicly available Node.js packages.
- When you run `npm install`, npm downloads the package from this registry.
