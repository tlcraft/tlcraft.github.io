import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

export function parseThresholdArgs(argv) {
  const thresholds = {
    maxLiveTime: undefined,
    maxSpan: undefined,
    maxAvgSpan: undefined,
  };

  for (const arg of argv) {
    if (arg.startsWith('--max-live-time=')) {
      thresholds.maxLiveTime = Number(arg.slice('--max-live-time='.length));
      continue;
    }

    if (arg.startsWith('--max-span=')) {
      thresholds.maxSpan = Number(arg.slice('--max-span='.length));
      continue;
    }

    if (arg.startsWith('--max-avg-span=')) {
      thresholds.maxAvgSpan = Number(arg.slice('--max-avg-span='.length));
    }
  }

  return thresholds;
}

function isValidThreshold(value) {
  return Number.isFinite(value) && value >= 0;
}

export function computeSpans(sortedLines) {
  const spans = [];

  for (let i = 1; i < sortedLines.length; i += 1) {
    const diff = sortedLines[i] - sortedLines[i - 1] - 1;
    spans.push(Math.max(0, diff));
  }

  return spans;
}

function getLine(sourceFile, position) {
  return sourceFile.getLineAndCharacterOfPosition(position).line + 1;
}

function isUserSourceFile(sourceFile) {
  if (sourceFile.isDeclarationFile) {
    return false;
  }

  const normalized = sourceFile.fileName.split(path.sep).join('/');
  return normalized.includes('/src/');
}

function collectBindingIdentifiers(nameNode, output) {
  if (ts.isIdentifier(nameNode)) {
    output.push(nameNode);
    return;
  }

  if (ts.isObjectBindingPattern(nameNode) || ts.isArrayBindingPattern(nameNode)) {
    for (const element of nameNode.elements) {
      if (ts.isBindingElement(element)) {
        collectBindingIdentifiers(element.name, output);
      }
    }
  }
}

function resolveSymbol(symbol, checker) {
  if (!symbol) {
    return undefined;
  }

  if (symbol.flags & ts.SymbolFlags.Alias) {
    try {
      return checker.getAliasedSymbol(symbol);
    } catch {
      return symbol;
    }
  }

  return symbol;
}

function makeSymbolKey(symbol) {
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  if (!declaration) {
    return undefined;
  }

  const sourceFile = declaration.getSourceFile();
  return `${sourceFile.fileName}:${declaration.pos}:${symbol.getName()}`;
}

function createProgramAndChecker(workspaceRoot) {
  const tsconfigPath = ts.findConfigFile(workspaceRoot, ts.sys.fileExists, 'tsconfig.json');
  if (!tsconfigPath) {
    throw new Error('Could not find tsconfig.json in the current workspace.');
  }

  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    const host = {
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      getCanonicalFileName: (fileName) => fileName,
      getNewLine: () => ts.sys.newLine,
    };
    throw new Error(ts.formatDiagnostic(configFile.error, host));
  }

  const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(tsconfigPath));
  const program = ts.createProgram({
    rootNames: parsedConfig.fileNames,
    options: parsedConfig.options,
  });

  return {
    program,
    checker: program.getTypeChecker(),
  };
}

function collectVariableSymbols(program, checker, workspaceRoot) {
  const variableSymbols = new Map();

  function registerVariableIdentifier(identifier) {
    const symbol = resolveSymbol(checker.getSymbolAtLocation(identifier), checker);
    if (!symbol) {
      return;
    }

    const key = makeSymbolKey(symbol);
    if (!key || variableSymbols.has(key)) {
      return;
    }

    const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
    if (!declaration) {
      return;
    }

    const sourceFile = declaration.getSourceFile();

    variableSymbols.set(key, {
      key,
      name: symbol.getName(),
      declaredIn: path.relative(workspaceRoot, sourceFile.fileName),
      declarationLine: getLine(sourceFile, declaration.getStart()),
      referenceLines: new Set(),
    });
  }

  function firstPassCollectDeclarations(node) {
    if (ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node)) {
      const identifiers = [];
      collectBindingIdentifiers(node.name, identifiers);
      for (const identifier of identifiers) {
        registerVariableIdentifier(identifier);
      }
    }

    if (ts.isCatchClause(node) && node.variableDeclaration) {
      const identifiers = [];
      collectBindingIdentifiers(node.variableDeclaration.name, identifiers);
      for (const identifier of identifiers) {
        registerVariableIdentifier(identifier);
      }
    }

    ts.forEachChild(node, firstPassCollectDeclarations);
  }

  function secondPassCollectReferences(node) {
    if (ts.isIdentifier(node)) {
      const symbol = resolveSymbol(checker.getSymbolAtLocation(node), checker);
      if (symbol) {
        const key = makeSymbolKey(symbol);
        const record = key ? variableSymbols.get(key) : undefined;
        if (record) {
          const sourceFile = node.getSourceFile();
          record.referenceLines.add(getLine(sourceFile, node.getStart()));
        }
      }
    }

    ts.forEachChild(node, secondPassCollectReferences);
  }

  for (const sourceFile of program.getSourceFiles()) {
    if (isUserSourceFile(sourceFile)) {
      firstPassCollectDeclarations(sourceFile);
    }
  }

  for (const sourceFile of program.getSourceFiles()) {
    if (isUserSourceFile(sourceFile)) {
      secondPassCollectReferences(sourceFile);
    }
  }

  return variableSymbols;
}

function buildVariableReport(variableSymbols) {
  const report = [];

  for (const record of variableSymbols.values()) {
    const lines = [...record.referenceLines].sort((a, b) => a - b);
    if (lines.length === 0) {
      continue;
    }

    const spans = computeSpans(lines);
    const first = lines[0];
    const last = lines.at(-1);
    const liveTimeInclusive = last - first + 1;
    const liveTimeDistance = last - first;
    const avgSpan = spans.length > 0 ? Number((spans.reduce((sum, value) => sum + value, 0) / spans.length).toFixed(2)) : 0;
    const maxSpan = spans.length > 0 ? Math.max(...spans) : 0;

    report.push({
      variable: record.name,
      file: record.declaredIn,
      declarationLine: record.declarationLine,
      referenceLines: lines,
      spanBetweenReferences: spans,
      maxSpan,
      avgSpan,
      liveTimeInclusive,
      liveTimeDistance,
    });
  }

  report.sort((a, b) => b.liveTimeInclusive - a.liveTimeInclusive || b.maxSpan - a.maxSpan || a.file.localeCompare(b.file));
  return report;
}

function writeReportToDisk(workspaceRoot, report) {
  const outputPath = path.join(workspaceRoot, 'out/variable-metrics.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  return outputPath;
}

function logSummary(logger, workspaceRoot, outputPath, report) {
  logger.log(`Wrote ${report.length} variable metrics to ${path.relative(workspaceRoot, outputPath)}.`);
  logger.log('Top 10 by live time (inclusive lines):');
  for (const item of report.slice(0, 10)) {
    logger.log(`- ${item.variable} (${item.file}:${item.declarationLine}) live=${item.liveTimeInclusive}, maxSpan=${item.maxSpan}`);
  }
}

function appendThresholdFailures(report, rule, failures) {
  const { threshold, metricKey, label } = rule;

  if (!isValidThreshold(threshold)) {
    return;
  }

  for (const item of report) {
    if (item[metricKey] > threshold) {
      failures.push(`${label}: ${item.variable} (${item.file}:${item.declarationLine}) is ${item[metricKey]}, threshold is ${threshold}`);
    }
  }
}

function collectThresholdFailures(report, thresholds) {
  const failures = [];

  appendThresholdFailures(report, {
    threshold: thresholds.maxLiveTime,
    metricKey: 'liveTimeInclusive',
    label: 'live-time',
  }, failures);
  appendThresholdFailures(report, {
    threshold: thresholds.maxSpan,
    metricKey: 'maxSpan',
    label: 'max-span',
  }, failures);
  appendThresholdFailures(report, {
    threshold: thresholds.maxAvgSpan,
    metricKey: 'avgSpan',
    label: 'avg-span',
  }, failures);

  return failures;
}

function logFailures(logger, failures) {
  if (failures.length === 0) {
    return;
  }

  logger.error('\nVariable metric threshold violations:');
  for (const failure of failures) {
    logger.error(`- ${failure}`);
  }
}

export function analyzeVariables(options = {}) {
  const workspaceRoot = options.workspaceRoot ?? process.cwd();
  const argv = options.argv ?? process.argv.slice(2);
  const logger = options.logger ?? console;
  const thresholds = parseThresholdArgs(argv);
  const { program, checker } = createProgramAndChecker(workspaceRoot);
  const variableSymbols = collectVariableSymbols(program, checker, workspaceRoot);
  const report = buildVariableReport(variableSymbols);
  const outputPath = writeReportToDisk(workspaceRoot, report);
  logSummary(logger, workspaceRoot, outputPath, report);
  const failures = collectThresholdFailures(report, thresholds);
  logFailures(logger, failures);

  return {
    report,
    failures,
    outputPath,
  };
}

function runCli() {
  try {
    const result = analyzeVariables({
      workspaceRoot: process.cwd(),
      argv: process.argv.slice(2),
      logger: console,
    });
    if (result.failures.length > 0) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

if (import.meta.url === new URL(process.argv[1], 'file://').href) {
  runCli();
}
