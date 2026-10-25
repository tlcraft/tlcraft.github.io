import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterEach, describe, expect, it } from 'vitest';

const scriptPath = path.resolve(process.cwd(), 'scripts/analyze-variables.mjs');

function writeFixtureProject(root: string): void {
  fs.mkdirSync(path.join(root, 'src'), { recursive: true });

  fs.writeFileSync(
    path.join(root, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          module: 'ESNext',
          strict: true,
        },
        include: ['src/**/*.ts'],
      },
      null,
      2,
    ),
  );

  fs.writeFileSync(
    path.join(root, 'src', 'sample.ts'),
    [
      'const seed = 1;',
      '',
      'function run(cond: boolean) {',
      '  const value = seed + 1;',
      '  if (cond) {',
      '    return value;',
      '  }',
      '  return value + seed;',
      '}',
      '',
      'export { run };',
    ].join('\n'),
  );
}

function runAnalyzer(cwd: string, args: string[] = []) {
  return spawnSync(process.execPath, [scriptPath, ...args], {
    cwd,
    encoding: 'utf8',
  });
}

function createTempProject(): string {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'variable-metrics-test-'));
  writeFixtureProject(tempRoot);
  return tempRoot;
}

function getVariableEntry(report: Array<Record<string, unknown>>, variableName: string) {
  return report.find((item) => item.variable === variableName);
}

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('analyze-variables script', () => {
  it('should write metrics to out/variable-metrics.json with expected calculations', () => {
    const tempProject = createTempProject();
    tempDirs.push(tempProject);

    const result = runAnalyzer(tempProject);
    expect(result.status).toBe(0);

    const outputPath = path.join(tempProject, 'out', 'variable-metrics.json');
    expect(fs.existsSync(outputPath)).toBe(true);

    const report = JSON.parse(fs.readFileSync(outputPath, 'utf8')) as Array<Record<string, unknown>>;
    const valueEntry = getVariableEntry(report, 'value');

    expect(valueEntry).toBeDefined();
    expect(valueEntry?.referenceLines).toEqual([4, 6, 8]);
    expect(valueEntry?.spanBetweenReferences).toEqual([1, 1]);
    expect(valueEntry?.maxSpan).toBe(1);
    expect(valueEntry?.liveTimeInclusive).toBe(5);
    expect(valueEntry?.liveTimeDistance).toBe(4);
  });

  it('should exit with code 1 when thresholds are exceeded', () => {
    const tempProject = createTempProject();
    tempDirs.push(tempProject);

    const result = runAnalyzer(tempProject, ['--max-live-time=4', '--max-span=2']);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Variable metric threshold violations:');
    expect(result.stderr).toContain('live-time: value');
  });

  it('should ignore invalid threshold values and still succeed', () => {
    const tempProject = createTempProject();
    tempDirs.push(tempProject);

    const result = runAnalyzer(tempProject, ['--max-live-time=not-a-number']);

    expect(result.status).toBe(0);
  });
});
