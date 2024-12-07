import http from 'http';
import mysql from 'mysql'
import { parse } from 'url';

// import mysql from './node_modules/mysql2/promise';

var db = mysql.createConnection({
  host: "sql3.freesqldatabase.com",
  user: "sql3749573",
  password: "rIUG8WrNgK",
  database: "sql3749573",
  port: 3306
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  const { pathname } = parse(req.url, true);

  // Respond to a GET request to /api/users
  if (pathname === '/api/users' && req.method === 'GET') {
      db.query('SELECT * FROM Users', (err, results) => {
          if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Error fetching users' }));
              return;
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(results));
      });
  } else {
      // Handle 404 for other paths
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
  }
});

// Start the server
const PORT = 3306;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// export default db


// con.connect(function(err) {
//   if (err) throw err;
//   //Select all customers and return the result object:
//   con.query("SELECT * FROM Users", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });


// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://pdsztbthakamzxiztnmf.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)









// const fs = require('fs');

// var data = fs.readFileSync('user-data.json');
// var myUsers = JSON.parse(data);






// function csvJSON(text, quoteChar = '"', delimiter = ',') {
//     var rows=text.split("\n");
//     var headers=rows[0].split(",");

//     const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');
  
//     const match = line => [...line.matchAll(regex)]
//       .map(m => m[2]) 
//       .slice(0, -1); 
  
//     var lines = text.split('\n');
//     const heads = headers ?? match(lines.shift());
//     lines = lines.slice(1);
    
//     return lines.map(line => {
//       return match(line).reduce((acc, cur, i) => {
//         // replace blank matches with `null`
//         const val = cur.length <= 0 ? null : Number(cur) || cur;
//         const key = heads[i] ?? `{i}`;
//         return { ...acc, [key]: val };
//       }, {});
//     });
//   }

// var csvtojson = csvJSON(SOME_CSV_DATA);
// console.log(csvtojson)

  
// const fs = require('fs');

// var data = fs.readFileSync('user-data.json');
// var myUsers = JSON.parse(data);






// function csvJSON(text, quoteChar = '"', delimiter = ',') {
//     var rows=text.split("\n");
//     var headers=rows[0].split(",");

//     const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');
  
//     const match = line => [...line.matchAll(regex)]
//       .map(m => m[2]) 
//       .slice(0, -1); 
  
//     var lines = text.split('\n');
//     const heads = headers ?? match(lines.shift());
//     lines = lines.slice(1);
    
//     return lines.map(line => {
//       return match(line).reduce((acc, cur, i) => {
//         // replace blank matches with `null`
//         const val = cur.length <= 0 ? null : Number(cur) || cur;
//         const key = heads[i] ?? `{i}`;
//         return { ...acc, [key]: val };
//       }, {});
//     });
//   }

// var csvtojson = csvJSON(SOME_CSV_DATA);
// console.log(csvtojson)
