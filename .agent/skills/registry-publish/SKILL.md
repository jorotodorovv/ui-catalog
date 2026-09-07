---
name: registry-publish
description: AI-driven workflow to extract, package, and publish React components and companion hooks/styles from any project directly into the personal custom shadcn registry (ui-catalog / joro-ui).
---

# Registry Publish Skill (joro-ui)

This skill guides the AI agent to extract components and hooks from any project repository and publish them into the personal custom shadcn registry located at `/mnt/storage/Code/ui-catalog` (catalog identifier: `joro-ui`).

## Target Registry Information
- **Repository Location**: `/mnt/storage/Code/ui-catalog`
- **Catalog Name**: `joro-ui`
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
   `/mnt/storage/Code/ui-catalog/registry/components/<component-name>.tsx`
2. If companion hooks exist, copy or write them to:
   `/mnt/storage/Code/ui-catalog/registry/hooks/<hook-name>.ts`
3. If custom CSS exists, add it to:
   `/mnt/storage/Code/ui-catalog/registry/styles/<component-name>.css` and ensure it is also reflected in `/mnt/storage/Code/ui-catalog/src/app/globals.css`.
4. Also copy the component and hooks to `/mnt/storage/Code/ui-catalog/src/components/ui/custom/` and `/mnt/storage/Code/ui-catalog/src/hooks/` so the catalog web app can render it live.

### Step 3: Update `registry.json`
Read `/mnt/storage/Code/ui-catalog/registry.json` and append the new item into the `items` array:

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
   bun run --cwd=/mnt/storage/Code/ui-catalog build:registry
   ```
2. Verify that `/mnt/storage/Code/ui-catalog/public/r/<component-name>.json` was generated and contains valid JSON with embedded file contents.
3. Validate the web app build:
   ```bash
   bun run --cwd=/mnt/storage/Code/ui-catalog build
   ```

### Step 5: Update the Showcase Catalog (Optional / Recommended)
In `/mnt/storage/Code/ui-catalog/src/app/page.tsx`:
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
