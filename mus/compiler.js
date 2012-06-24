// this is all you
var endTime = function (time, expr) {
    // your code here
    if (expr.tag === 'note') {
        return time + expr.dur;
    }
    else if (expr.tag === 'seq') {
        return endTime(endTime(time, expr.left),expr.right);
    }
    else if (expr.tag === 'par') {
        return Math.max(endTime(time, expr.left),endTime(time,expr.right));
    }
};

// maybe some helper functions

var compileWithTime = function (musexpr, time) {
    if (musexpr.tag === 'note') {
        return [{
            tag: musexpr.tag,
            pitch: musexpr.pitch,
            start: time,
            dur: musexpr.dur
        }];
    }
    else if (musexpr.tag === 'seq') {
        return compileWithTime(musexpr.left,time).concat(compileWithTime(musexpr.right,endTime(time,musexpr.left)));
    }
    else if (musexpr.tag === 'par') {
        return compileWithTime(musexpr.left,time).concat(compileWithTime(musexpr.right,time));
    }
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
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));