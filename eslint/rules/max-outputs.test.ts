import { describe, expect, it } from 'vitest';
import { ESLint } from 'eslint';
import maxOutputsRule from './max-outputs.mjs';

async function lintWithRule(code: string, max?: number) {
  const eslint = new ESLint({
    overrideConfigFile: true,
    ignore: false,
    overrideConfig: [
      {
        languageOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        plugins: {
          local: {
            rules: {
              'max-outputs': maxOutputsRule,
            },
          },
        },
        rules: {
          'local/max-outputs': ['warn', ...(max === undefined ? [] : [{ max }])],
        },
      },
    ],
  });

  const [result] = await eslint.lintText(code, { filePath: 'fixture.js' });
  return result.messages.filter((message) => message.ruleId === 'local/max-outputs');
}

describe('max-outputs rule', () => {
  it('should report when default max (1) is exceeded', async () => {
    const messages = await lintWithRule(`
      function foo(flag) {
        if (flag) return 1;
        return 2;
      }
    `);

    expect(messages).toHaveLength(1);
    expect(messages[0].message).toContain('foo has 2 return statements; maximum allowed is 1.');
  });

  it('should not report when returns are within configured max', async () => {
    const messages = await lintWithRule(`
      const pick = (flag) => {
        if (flag) return 1;
        return 2;
      };
    `, 2);

    expect(messages).toHaveLength(0);
  });

  it('should track nested functions independently', async () => {
    const messages = await lintWithRule(`
      function outer(flag) {
        const inner = () => {
          if (flag) return 1;
          return 2;
        };

        if (flag) return inner();
        return inner();
      }
    `, 1);

    expect(messages).toHaveLength(2);
    const text = messages.map((message) => message.message).join('\n');
    expect(text).toContain('inner has 2 return statements; maximum allowed is 1.');
    expect(text).toContain('outer has 2 return statements; maximum allowed is 1.');
  });

  it('should use variable names for object property functions', async () => {
    const messages = await lintWithRule(`
      const handlers = {
        pick(flag) {
          if (flag) return 1;
          return 2;
        }
      };
    `, 1);

    expect(messages).toHaveLength(1);
    expect(messages[0].message).toContain('pick has 2 return statements; maximum allowed is 1.');
  });

  it('should use assignment target names for assigned function expressions', async () => {
    const messages = await lintWithRule(`
      let choose;
      choose = function (flag) {
        if (flag) return 1;
        return 2;
      };
    `, 1);

    expect(messages).toHaveLength(1);
    expect(messages[0].message).toContain('choose has 2 return statements; maximum allowed is 1.');
  });

  it('should report anonymous function when no supported parent naming exists', async () => {
    const messages = await lintWithRule(`
      (function (flag) {
        if (flag) return 1;
        return 2;
      })(true);
    `, 1);

    expect(messages).toHaveLength(1);
    expect(messages[0].message).toContain('anonymous function has 2 return statements; maximum allowed is 1.');
  });
});
