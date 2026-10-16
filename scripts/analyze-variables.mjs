import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const workspaceRoot = process.cwd();
const tsconfigPath = ts.findConfigFile(workspaceRoot, ts.sys.fileExists, 'tsconfig.json');

if (!tsconfigPath) {
  console.error('Could not find tsconfig.json in the current workspace.');
  process.exit(1);
}

const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
if (configFile.error) {
  const host = {
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => ts.sys.newLine,
  };
  console.error(ts.formatDiagnostic(configFile.error, host));
  process.exit(1);
}

const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(tsconfigPath));
const program = ts.createProgram({
  rootNames: parsedConfig.fileNames,
  options: parsedConfig.options,
});
const checker = program.getTypeChecker();

const variableSymbols = new Map();

function isUserSourceFile(sourceFile) {
  if (sourceFile.isDeclarationFile) {
    return false;
  }

  const normalized = sourceFile.fileName.split(path.sep).join('/');
  return normalized.includes('/src/');
}

function getLine(sourceFile, position) {
  return sourceFile.getLineAndCharacterOfPosition(position).line + 1;
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

function resolveSymbol(symbol) {
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

function registerVariableIdentifier(identifier) {
  const symbol = resolveSymbol(checker.getSymbolAtLocation(identifier));

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
    symbol,
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

for (const sourceFile of program.getSourceFiles()) {
  if (!isUserSourceFile(sourceFile)) {
    continue;
  }

  firstPassCollectDeclarations(sourceFile);
}

function secondPassCollectReferences(node) {
  if (ts.isIdentifier(node)) {
    const symbol = resolveSymbol(checker.getSymbolAtLocation(node));
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
  if (!isUserSourceFile(sourceFile)) {
    continue;
  }

  secondPassCollectReferences(sourceFile);
}

function computeSpans(sortedLines) {
  const spans = [];

  for (let i = 1; i < sortedLines.length; i += 1) {
    const diff = sortedLines[i] - sortedLines[i - 1] - 1;
    spans.push(Math.max(0, diff));
  }

  return spans;
}

const report = [];

for (const record of variableSymbols.values()) {
  const lines = [...record.referenceLines].sort((a, b) => a - b);
  if (lines.length === 0) {
    continue;
  }

  const spans = computeSpans(lines);
  const first = lines[0];
  const last = lines[lines.length - 1];
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

const outputPath = path.join(workspaceRoot, 'variable-metrics.json');
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

console.log(`Wrote ${report.length} variable metrics to ${path.relative(workspaceRoot, outputPath)}.`);
console.log('Top 10 by live time (inclusive lines):');
for (const item of report.slice(0, 10)) {
  console.log(`- ${item.variable} (${item.file}:${item.declarationLine}) live=${item.liveTimeInclusive}, maxSpan=${item.maxSpan}`);
}
