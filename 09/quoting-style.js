let text = "'I'm the cook,' he said, 'it's my job.'";

console.log(text.replace(/(^|\W)'|'(\W|$)/g, '"'));
// → "I'm the cook," he said, "it's my job."
