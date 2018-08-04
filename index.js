const   fs = require('fs'), 
        batch = require('./batch'),
        split2 = require('split2');

const WritableBulk = require('elasticsearch-streams').WritableBulk;
const TransformToBulk = require('elasticsearch-streams').TransformToBulk;
const client = new require('elasticsearch').Client();

var bulkExec = function(bulkCmds, callback) {
    // bulkCmds = bulkCmds.toString();
    // bulkCmds = JSON.parse(bulkCmds);
    client.bulk({
      index : 'myindex',
      type  : 'mytype',
      body  : bulkCmds
    }, callback);
};

var ws = new WritableBulk(bulkExec);
var toBulk = new TransformToBulk(function getIndexTypeId(doc) { 
    docObject = JSON.parse(doc);
    // return { _index: 'myindex', _type: 'mytype', _id: docObject.sku }
    return { _id: docObject.sku};
});


fs.createReadStream(__dirname + '/../data/products.json')
    .pipe(split2())
    .pipe(new batch())
    .pipe(toBulk)
    .pipe(ws)
    // .pipe(new post())
    .on('finish', function(o) {
      console.log('Parsing ended');
    });