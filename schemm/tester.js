var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

// Read file contents
var data = fs.readFileSync('parse.peg', 'utf-8');
// Show the PEG grammar file
console.log(data);
// Create my parser
var parse = PEG.buildParser(data).parse;
// Do a test
assert.deepEqual( parse("(+ 1 (f x 3 y))"), [
   "+",
   "1",
   [
      "f",
      "x",
      "3",
      "y"
   ]
] );