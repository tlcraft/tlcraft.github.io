const DEFAULT_MAX_OUTPUTS = 1;

/** @type {import('eslint').Rule.RuleModule} */
const maxOutputsRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Limit the number of return statements in a function.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooManyOutputs: '{{name}} has {{actual}} return statements; maximum allowed is {{max}}.',
    },
  },
  create(context) {
    const configuredMax = context.options[0]?.max;
    const maxOutputs = Number.isInteger(configuredMax) ? configuredMax : DEFAULT_MAX_OUTPUTS;
    // Track nested functions independently so each function gets its own return count.
    const functionStack = [];

    function enterFunction(node) {
      functionStack.push({ node, returns: 0 });
    }

    function exitFunction() {
      const current = functionStack.pop();

      if (!current || current.returns <= maxOutputs) {
        return;
      }

      context.report({
        node: current.node,
        messageId: 'tooManyOutputs',
        data: {
          name: getFunctionName(current.node),
          actual: String(current.returns),
          max: String(maxOutputs),
        },
      });
    }

    return {
      // Push a new counter for every function shape ESLint visits.
      FunctionDeclaration: enterFunction,
      FunctionExpression: enterFunction,
      ArrowFunctionExpression: enterFunction,
      ReturnStatement() {
        // Only increment the active function on top of the stack.
        const current = functionStack.at(-1);

        if (current) {
          current.returns += 1;
        }
      },
      // Evaluate the count only after the full function body has been traversed.
      'FunctionDeclaration:exit': exitFunction,
      'FunctionExpression:exit': exitFunction,
      'ArrowFunctionExpression:exit': exitFunction,
    };
  },
};

function getFunctionName(node) {
  if (node.type === 'FunctionDeclaration' && node.id?.name) {
    return node.id.name;
  }

  if ((node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') && node.parent) {
    if (node.parent.type === 'VariableDeclarator' && node.parent.id?.type === 'Identifier') {
      return node.parent.id.name;
    }

    if (node.parent.type === 'Property' && node.parent.key?.type === 'Identifier') {
      return node.parent.key.name;
    }

    if (node.parent.type === 'AssignmentExpression' && node.parent.left?.type === 'Identifier') {
      return node.parent.left.name;
    }
  }

  return 'anonymous function';
}

export default maxOutputsRule;
