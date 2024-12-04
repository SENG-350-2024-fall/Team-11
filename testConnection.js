//this file is for debugging only! it checks your connection to the database :)

const MongoClient = require('mongodb').MongoClient;

const connection_url = 'mongodb://team11:4eGCz3*LgQY.jNURsNV!@docdb-2024-11-05-04-54-06.node.us-east-1.docdb.amazonaws.com:27017/team11?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false';

MongoClient.connect(connection_url, { tls: true }, (err, client) => {
    if (err) {
        console.error("Failed to connect to the database:", err);
        return;
    }
    console.log("Connected successfully to the database");

    // Optionally, perform a simple operation like listing collections
    const db = client.db('team11');
    db.collections()
        .then(collections => {
            console.log("Collections in the database:");
            collections.forEach(collection => {
                console.log(collection.collectionName);
            });
            client.close(); // Close the connection when done
        })
        .catch(err => {
            console.error("Error listing collections:", err);
            client.close();
        });
});
