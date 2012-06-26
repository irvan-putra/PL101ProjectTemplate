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
assert.deepEqual( parse("(seq(seq(note a4 250)(par(note b4 250)(seq (note g5 100)(rest 300))))(seq(repeat3x(seq(note c4 250)(rest 500)))(note d4 500)))"),  { tag: 'seq',
          left: 
           { tag: 'seq',
             left: { tag: 'note', pitch: 'a4', dur: 250 },
             right: {
               tag : 'par',
               left : { tag: 'note', pitch: 'b4', dur: 250 },
               right : {
                 tag : 'seq',
                  left : {tag : 'note', pitch : 'g5', dur : 100},
                  right : {tag : 'rest', dur : 300}
               }
              }
          },
          right:
           { tag: 'seq',
             left: { tag: 'repeat',
               section: { 
                 tag : 'seq', 
                 left : {tag: 'note', pitch: 'c4', dur: 250 },
                 right : { tag: 'rest',  dur: 500 }
                 }, 
               count: 3 },
             right: { tag: 'note', pitch: 'd4', dur: 500 } } } );