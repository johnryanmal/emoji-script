const repl = require("node:repl");
const vm = require('vm');

function emojiEval(cmd, context, filename, callback) {
  const emojis = /\p{Extended_Pictographic}(\u200d\p{Extended_Pictographic})*/ug;
  newCmd = cmd.replaceAll(emojis, (emoji) => `'${emoji}'`);

  let result;
  try {
    result = vm.runInThisContext(newCmd);
  } catch (error) {
    if (error.name === 'SyntaxError' && error.message === 'Unexpected end of input') {
      return callback(new repl.Recoverable(error));
    } else {
      return callback(error);
    }
  }
  callback(null, result);
}

function emojiWriter(output) {
  return output;
}

console.log('Welcome to EmojiScript!')
console.log('Type ".help" for more information.')
const emojiRepl = repl.start({ prompt: "> ", eval: emojiEval, writer: emojiWriter });

// [🍔,🍔,🍔].map(() => 🍟)
// [🍟,🍔,🍟].filter((item) => item === 🍟)
// [🍟,🍔,🍟].find((item) => item === 🍔)
// [🍟,🍔,🍟].findIndex((item) => item === 🍔)
// [🍔,🍔,🍔].fill(🍟, 1)
// [🍟,🍔,🍟].some((item) => item === 🍔)
// [🍟,🍔,🍟].every((item) => item === 🍔)
