---
name: registry-publish
description: AI-driven workflow to extract, package, and publish React components and companion hooks/styles from any project directly into the personal custom shadcn registry (ui-catalog / joro-ui).
---

# Registry Publish Skill (joro-ui)

This skill guides the AI agent to extract components and hooks from any project repository and publish them into the personal custom shadcn registry (`joro-ui`).

## Target Registry Resolution

Before performing file operations, resolve the catalog root directory (`<ui-catalog-root>`) in order of precedence:
1. **Environment Variable**: Check if `UI_CATALOG_DIR` or `REGISTRY_DIR` is set.
2. **Current Workspace**: If the active workspace is already `ui-catalog`, use `.`.
3. **Sibling Directory**: Check for `../ui-catalog` relative to the current project root.
4. **User Prompt / Discovery**: If not found in previous steps, locate `ui-catalog` or prompt the user for the local path.

- **Catalog Identifier**: `joro-ui`
- **Consumer Import Command**: `npx shadcn add @joro-ui/<component-name>`

---

## Autonomous AI Execution Workflow

When the user asks to publish, export, or add a component or hook to their registry, execute the following steps using your native agent tools:

### Step 1: Inspect and Trace the Component
1. Read the component source file in the current project using `view_file`.
2. Trace all imports:
   - **Companion Hooks**: Any imports from `@/hooks/...` or `./use-...` (e.g. `useViewTransitionTheme`).
   - **Shared Primitives**: Any base shadcn components (e.g. `@/components/ui/button`).
   - **External NPM Dependencies**: Third-party packages imported (e.g. `framer-motion`, `lucide-react`, `next-themes`).
   - **Custom Styles**: Any CSS classes or keyframes defined in project stylesheets (e.g. `globals.css` or `index.css`).

### Step 2: Transfer Files into a Self-Contained Component Folder
All files belonging to the component (UI, companion hook, barrel export, styles) MUST be co-located in a dedicated folder: `<ui-catalog-root>/registry/<component-name>/`.

1. Copy or write the files:
   - Component: `<ui-catalog-root>/registry/<component-name>/<component-name>.tsx`
   - Companion hook: `<ui-catalog-root>/registry/<component-name>/<hook-name>.ts`
   - Barrel export: `<ui-catalog-root>/registry/<component-name>/index.ts` (re-exporting component and hooks)
   - Custom CSS (if any): `<ui-catalog-root>/registry/<component-name>/styles.css`
2. **Normalize Imports**: Ensure the component imports its companion hook relatively (e.g. `import { use... } from './use-...'`), ensuring zero path alias breakage across different projects.

### Step 3: Update `registry.json`
Read `<ui-catalog-root>/registry.json` and append the new item into the `items` array. Map `target` to a matching self-contained folder so consumer projects receive everything in one clean directory:

```json
{
  "name": "<component-name>",
  "type": "registry:component",
  "title": "<Human-Readable Title>",
  "description": "<Brief description of what it does>",
  "dependencies": [
    "<external-npm-packages-identified-in-step-1>"
  ],
  "registryDependencies": [
    "<base-shadcn-primitives-like-button-if-any>"
  ],
  "files": [
    {
      "path": "registry/<component-name>/index.ts",
      "type": "registry:component",
      "target": "components/ui/custom/<component-name>/index.ts"
    },
    {
      "path": "registry/<component-name>/<component-name>.tsx",
      "type": "registry:component",
      "target": "components/ui/custom/<component-name>/<component-name>.tsx"
    },
    {
      "path": "registry/<component-name>/<hook-name>.ts",
      "type": "registry:hook",
      "target": "components/ui/custom/<component-name>/<hook-name>.ts"
    }
  ]
}
```

### Step 4: Build & Validate the Registry
1. Run the registry compilation command:
   ```bash
   bun run --cwd="<ui-catalog-root>" build:registry
   ```
2. Verify that `<ui-catalog-root>/public/r/<component-name>.json` was generated and contains valid JSON with embedded file contents.
3. Validate the web app build:
   ```bash
   bun run --cwd="<ui-catalog-root>" build
   ```

### Step 5: Update the Showcase Catalog (Optional / Recommended)
In `<ui-catalog-root>/src/app/page.tsx`:
- Add a new showcase card rendering `<YourNewComponent />`.
- Add code viewer snippets for the component and its companion hook.

### Step 6: Consumer Project Migration & Cleanup (Default)
When extracting from an active project repository:
1. Push and ensure the catalog deployment is live on Vercel (`curl -s ...`).
2. Run `npx shadcn add @joro-ui/<component-name>` in the consumer project.
3. Remove the obsolete legacy file(s) from the consumer project (e.g. `rm src/components/ui/custom/<component-name>.tsx` or legacy hook file).
4. Verify import paths resolve to the new directory barrel export (`components/ui/custom/<component-name>/index.ts`).
5. Run TypeScript check (`tsc --noEmit`) and test suites (`vitest` / `npm test`) to guarantee zero regressions.

### Step 7: Confirmation Output
Report to the user:
1. The component name registered (`<component-name>`).
2. The companion files bundled (`components/ui/custom/...`, `hooks/...`).
3. Verification of successful installation and cleanup in the consumer repository.
4. The exact command to install it in any other project:
   ```bash
   npx shadcn add @joro-ui/<component-name>
   ```

