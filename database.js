<<<<<<< HEAD
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql3.freesqldatabase.com",
  user: "sql3749573",
  password: "rIUG8WrNgK",
  database: "sql3749573",
  port: 3306
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
=======

// Create a MongoDB client, open a connection to DocDB as a replica set
var MongoClient = require('mongodb').MongoClient;

const connection_url = 'mongodb://team11:4eGCz3*LgQY.jNURsNV!@docdb-2024-11-05-04-54-06.node.us-east-1.docdb.amazonaws.com:27017/sample-database?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false';

// Function to get first_name by email and password
function getFirstNameByEmailAndPassword(email, password, callback) {
    MongoClient.connect(connection_url,
        { useNewUrlParser: true, ssl: true, tlsCAFile: `global-bundle.pem` }, // Ensure you specify tlsCAFile
        function(err, client) {
            if (err) {
                console.error("Failed to connect to database:", err);
                callback(err, null);
                return;
            }
        
            const db = client.db('team11');
            const col = db.collection('user');

            // Find document with matching email and password
            col.findOne({ email: email, password: password }, { projection: { first_name: 1 } }, function(err, result) {
                if (err) {
                    console.error("Error finding user:", err);
                    callback(err, null);
                    client.close();
                    return;
                }
    
                // If a result is found, return the first_name; otherwise, return an error
                if (result) {
                    callback(null, result.first_name);
                } else {
                    callback("No user found with provided email and password", null);
                }
    
                client.close();
            });
        });
}

// Export the function
module.exports = { getFirstNameByEmailAndPassword };



// //Create a MongoDB client, open a connection to DocDB; as a replica set,
// var MongoClient = require('mongodb').MongoClient

// const connection_url = 'mongodb://team11:4eGCz3*LgQY.jNURsNV!@docdb-2024-11-05-04-54-06.node.us-east-1.docdb.amazonaws.com:27017/sample-database?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false';
>>>>>>> e2b3ac8aca874c61b65d7b3e4e46cd43e902ec44

con.connect(function(err) {
  if (err) throw err;
  //Select all customers and return the result object:
  con.query("SELECT * FROM Users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});


<<<<<<< HEAD
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
=======
// //  and specify the read preference as secondary preferred

// var client = MongoClient.connect(
// 'mongodb://team11:4eGCz3*LgQY.jNURsNV!@docdb-2024-11-05-04-54-06.node.us-east-1.docdb.amazonaws.com:27017/sample-database?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false',
// {
//   tlsCAFile: `global-bundle.pem` //Specify the DocDB; cert
// },
// function(err, client) {
//     if(err)
//         throw err;

//     //Specify the database to be used
//     db = client.db('team11');

//     //Specify the collection to be used
//     col = db.collection('user');

//     //Insert a single document
//     // col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
//     //   //Find the document that was previously written
//     //   col.findOne({'hello':'Amazon DocumentDB'}, function(err, result){
//     //     //Print the result to the screen
//     //     console.log(result);

//         //Close the connection
//         client.close()
// //       });
// //    });
// });

// function getFNfromEmailAndPassword(email, password, callback) {
//     MongoClient.connect(connection_url,
//         { useNewUrlParser: true, ssl: true, sslValidate: true },
//         function(err, client) {
//         if (err) {
//             console.error("Failed to connect to database:", err);
//             callback(err, null);
//             return;
//         }
        
//         const db = client.db('team11');
//         const col = db.collection('user');

//         // Find document with matching email and password
//         col.findOne({ email: email, password: password }, { projection: { first_name: 1 } }, function(err, result) {
//             if (err) {
//                 console.error("Error finding user:", err);
//                 callback(err, null);
//                 client.close();
//                 return;
//             }
    
//         // If a result is found, return the first_name; otherwise, return an error
//         if (result) {
//             callback(null, result.first_name);
//         } else {
//             callback("No user found with provided email and password", null);
//         }
    
//         client.close();
//         });
//     });
// }



// module.exports = { getFNfromEmailAndPassword };
>>>>>>> e2b3ac8aca874c61b65d7b3e4e46cd43e902ec44
