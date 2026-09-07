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

### Step 2: Transfer Files to `ui-catalog`
1. Copy or write the component file to:
   `<ui-catalog-root>/registry/components/<component-name>.tsx`
2. If companion hooks exist, copy or write them to:
   `<ui-catalog-root>/registry/hooks/<hook-name>.ts`
3. If custom CSS exists, add it to:
   `<ui-catalog-root>/registry/styles/<component-name>.css` and ensure it is also reflected in `<ui-catalog-root>/src/app/globals.css`.
4. Also copy the component and hooks to `<ui-catalog-root>/src/components/ui/custom/` and `<ui-catalog-root>/src/hooks/` so the catalog web app can render it live.

### Step 3: Update `registry.json`
Read `<ui-catalog-root>/registry.json` and append the new item into the `items` array:

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
      "path": "registry/components/<component-name>.tsx",
      "type": "registry:component",
      "target": "components/ui/custom/<component-name>.tsx"
    },
    {
      "path": "registry/hooks/<hook-name>.ts",
      "type": "registry:hook",
      "target": "hooks/<hook-name>.ts"
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

### Step 6: Confirmation Output
Report to the user:
1. The component name registered (`<component-name>`).
2. The companion files bundled (`components/ui/custom/...`, `hooks/...`).
3. The exact command to install it in any other project:
   ```bash
   npx shadcn add @joro-ui/<component-name>
   ```
