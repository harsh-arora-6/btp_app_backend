const fs = require('fs');
const csv = require('csv-parser');
let result = []


module.exports.readData = function readData(){
    const results = [];
    fs.createReadStream(__dirname + '/btp_test.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        result = [...results]
    });
    module.exports.result = result;
}
