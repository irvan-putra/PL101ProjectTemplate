// this is all you
var endTime = function (time, expr) {
    // your code here
	switch (expr.tag) {
		case 'note': return time + expr.dur; break;
		case 'seq': return time + endTime(endTime(0, expr.left),expr.right); break;
		case 'par': return time + Math.max(endTime(0, expr.left),endTime(0,expr.right)); break;
		case 'rest': return time + expr.dur; break;
		case 'repeat': return time + endTime(0, expr.section)*expr.count; break;
	}
};

// maybe some helper functions
var letterPitch = function (letter) {
	switch (letter) {
		case 'c': return 0; break;
		case 'd': return 2; break;
		case 'e': return 4; break;
		case 'f': return 5; break;
		case 'g': return 7; break;
		case 'a': return 9; break;
		case 'b': return 11; break;
	}
};

var convertPitch = function(pitch) {
	return 12+12*Number(pitch.substr(-1)) + letterPitch(pitch.substr(0,1));
};

var compileWithTime = function (musexpr, time) {
	var returnArray = [];
	switch (musexpr.tag) {
		case 'note':
			returnArray = [{
				tag: musexpr.tag,
				pitch: convertPitch(musexpr.pitch),
				start: time,
				dur: musexpr.dur
			}];
			break;
		case 'seq':
			returnArray = compileWithTime(musexpr.left,time).concat(compileWithTime(musexpr.right,endTime(time,musexpr.left)));
			break;
		case 'par':
			returnArray = compileWithTime(musexpr.left,time).concat(compileWithTime(musexpr.right,time));
			break;
		case 'rest':
	        returnArray = [];
			break;
		case 'repeat':
			var currentEndTime = time;
			for (i=1; i<=musexpr.count; i++) {
				returnArray = returnArray.concat(compileWithTime(musexpr.section, currentEndTime));
				currentEndTime = endTime(currentEndTime, musexpr.section);
			}
			break;
	}
	return returnArray;
};

var compile = function (musexpr) {
    // your code here
    return compileWithTime(musexpr,0);
};

var melody_mus = 
        { tag: 'seq',
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
             right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));