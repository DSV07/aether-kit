import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function findAgentsDir(subDir: string): string {
  // 1. Traverse up from __dirname
  let dir = __dirname;
  for (let i = 0; i < 10; i++) {
    const candidate = join(dir, '.agents', subDir);
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  
  // 2. Traverse up from process.cwd() as fallback
  dir = process.cwd();
  for (let i = 0; i < 10; i++) {
    const candidate = join(dir, '.agents', subDir);
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  // 3. Absolute fallback (creates it near the dist folder)
  return join(dirname(dirname(dirname(__dirname))), '.agents', subDir);
}

export function getMemoryDir(): string {
  const envPath = process.env.AGKIT_MEMORY_DIR;
  if (envPath) return resolve(envPath);
  return findAgentsDir('memory');
}

export function getMcpDataDir(): string {
  const envPath = process.env.AGKIT_MCP_DATA_DIR;
  if (envPath) return resolve(envPath);
  return findAgentsDir(join('mcp', 'antigravity-learning-mcp', 'data'));
}

export function getSkillsDir(): string {
  const envPath = process.env.AGKIT_SKILLS_DIR;
  if (envPath) return resolve(envPath);
  return findAgentsDir('skills');
}

export function getGeneratedSkillsDir(): string {
  const envPath = process.env.AGKIT_GENERATED_SKILLS_DIR;
  if (envPath) return resolve(envPath);
  return join(dirname(getMcpDataDir()), 'generated-skills');
}

export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

export function readFileSafe(filePath: string): string | null {
  try {
    if (!existsSync(filePath)) return null;
    return readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

export function writeFileSafe(filePath: string, content: string): void {
  ensureDir(dirname(filePath));
  writeFileSync(filePath, content, 'utf-8');
}
