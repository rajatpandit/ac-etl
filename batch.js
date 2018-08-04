var util = require('util');
var Transform = require('stream').Transform;

function Batch(options) {
    Transform.call(this, {objectMode:true});
    // Transform.call(this, options);
}
util.inherits(Batch, Transform);

let counter = 0;
Batch.prototype._transform = function(data, encoding, callback) {
    let line = data.toString();
    line = line.replace ( /^\[/ ,'');
    line = line.replace ( /\,$/ ,'');
    line = line.replace ( /\]$/ ,'');
    line = JSON.parse(line);
    console.log(`Processed ${counter++} products`);
    // push this into the index only if it does have a name
    
    if (line.name)  {
        this.push(JSON.stringify(line));
    }
    
    callback();
}

module.exports = Batch;