//importScripts('../build/ffmpeg.js');
var tools = require('../build/ffmpeg.js');

fs = require('fs')
fs.readFile('./big_buck_bunny.webm', 'binary', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var ab = new ArrayBuffer(data.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i);
  }

  var results = run("./big_buck_bunny.webm", ia,
    ["-i", "./big_buck_bunny.webm", "-vf", "showinfo,scale=w=-1:h=-1", "-strict", "experimental", "-v", "verbose", "./output.mov"]);
  console.log(results);
});

//self.addEventListener('message', function(e) {
//  postMessage({
//    'type' : 'start'
//  });

//  var results = run("big_buck_bunny.webm", e.data,
//    ["-i", "big_buck_bunny.webm", "-vf", "showinfo,scale=w=-1:h=-1", "-strict", "experimental", "-v", "verbose", "output.mov"]);

//  postMessage({
//    'type' : 'end'
//  });
//});

function run(filename, data, args) {
    var mod = {
      print: function (text) {
        //postMessage({
        //  'type' : 'stdout',
        //  'data' : text
        //});
        console.log(text);
      },
      printErr: function (text) {
        //postMessage({
        //  'type' : 'stdout',
        //  'data' : text
        //});
	console.log(text);
      },
      'arguments': args,
      'files': [{
        data: data,
        name: filename
      }]
    };
    
    console.log(mod)
    var result = tools.ffmpeg_run(mod);
    //console.log(data)
    return result;
}
