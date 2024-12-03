const fs = require('fs');

var data = fs.readFileSync('user-data.json');
var myUsers = JSON.parse(data);






function csvJSON(text, quoteChar = '"', delimiter = ',') {
    var rows=text.split("\n");
    var headers=rows[0].split(",");

    const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');
  
    const match = line => [...line.matchAll(regex)]
      .map(m => m[2]) 
      .slice(0, -1); 
  
    var lines = text.split('\n');
    const heads = headers ?? match(lines.shift());
    lines = lines.slice(1);
    
    return lines.map(line => {
      return match(line).reduce((acc, cur, i) => {
        // replace blank matches with `null`
        const val = cur.length <= 0 ? null : Number(cur) || cur;
        const key = heads[i] ?? `{i}`;
        return { ...acc, [key]: val };
      }, {});
    });
  }

var csvtojson = csvJSON(SOME_CSV_DATA);
console.log(csvtojson)