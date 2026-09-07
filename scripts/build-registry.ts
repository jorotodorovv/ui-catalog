import fs from 'node:fs';
import path from 'node:path';

interface RegistryFile {
  name?: string;
  path: string;
  type: string;
  target?: string;
  content?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  cssVars?: Record<string, unknown>;
  tailwind?: Record<string, unknown>;
}

interface RegistryManifest {
  $schema?: string;
  name: string;
  homepage?: string;
  items: RegistryItem[];
}

function build() {
  const rootDir = process.cwd();
  const registryJsonPath = path.join(rootDir, 'registry.json');
  const outputDir = path.join(rootDir, 'public', 'r');
  const dataDir = path.join(rootDir, 'src', 'data');

  if (!fs.existsSync(registryJsonPath)) {
    console.error('Error: registry.json not found in root directory.');
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const raw = fs.readFileSync(registryJsonPath, 'utf-8');
  const manifest: RegistryManifest = JSON.parse(raw);

  console.log(`🔨 Building registry "${manifest.name}" with ${manifest.items.length} items...`);

  const registryFilesMap: Record<
    string,
    Array<{
      name: string;
      path: string;
      target?: string;
      type: string;
      content: string;
    }>
  > = {};

  for (const item of manifest.items) {
    const filesWithContent: RegistryFile[] = item.files.map((file) => {
      const filePath = path.join(rootDir, file.path);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        process.exit(1);
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      return {
        name: path.basename(file.path),
        path: file.path,
        type: file.type,
        target: file.target,
        content,
      };
    });

    registryFilesMap[item.name] = filesWithContent as Array<{
      name: string;
      path: string;
      target?: string;
      type: string;
      content: string;
    }>;

    const registryItemPayload = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies ?? [],
      devDependencies: item.devDependencies ?? [],
      registryDependencies: item.registryDependencies ?? [],
      files: filesWithContent.map((file) => ({
        path: file.path,
        type: file.type,
        target: file.target,
        content: file.content,
      })),
      cssVars: item.cssVars,
      tailwind: item.tailwind,
    };

    const itemOutFile = path.join(outputDir, `${item.name}.json`);
    fs.writeFileSync(itemOutFile, JSON.stringify(registryItemPayload, null, 2), 'utf-8');
    console.log(`  ✓ Built public/r/${item.name}.json`);
  }

  // Generate index.json
  const indexPath = path.join(outputDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(manifest.items, null, 2), 'utf-8');
  console.log(`  ✓ Built public/r/index.json`);

  // Generate src/data/registry-files.json for in-app code inspector
  const registryFilesJsonPath = path.join(dataDir, 'registry-files.json');
  fs.writeFileSync(registryFilesJsonPath, JSON.stringify(registryFilesMap, null, 2), 'utf-8');
  console.log(`  ✓ Built src/data/registry-files.json`);

  console.log('✨ Registry build completed successfully!');
}

build();
