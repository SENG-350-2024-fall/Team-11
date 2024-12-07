import http from 'http';
import mysql from 'mysql';
import { parse } from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = mysql.createConnection({
  host: "sql3.freesqldatabase.com",
  user: "sql3749573",
  password: "rIUG8WrNgK",
  database: "sql3749573",
  port: 3306
});

// sally:
/*
fname: 'Sally',
lname: 'Jones',
email: 'test@test123.com',
password: 'test123',
utype: 'patient',
account_created: 2024-12-03T08:00:00.000Z,
uid: 1

patient fields: uid, symptoms, diagnosis, prescription, prescription_filled
*/




const server = http.createServer((req, res) => {
  const { pathname } = parse(req.url, true);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS requests for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Serve static files
  if (pathname === '/pharm-view.html') {
    fs.readFile('pharm-view.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  if (pathname === '/css/pharm-style.css') {
    fs.readFile(path.join(__dirname, 'css', 'pharm-style.css'), (err, data) => {
        if (err) {
            console.error('Error reading CSS:', err);
            res.writeHead(404);
            res.end('CSS Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
    });
    return;
}

  if (pathname === '/pharmacist.js') {
    fs.readFile('pharmacist.js', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
    return;
  }

  // API Endpoints
  if (pathname === '/api/prescriptions' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { patientId, prescription } = JSON.parse(body);
        
        const query = 'UPDATE Patients SET prescription = ?, prescription_filled = 0 WHERE uid = ?';
        db.query(query, [prescription, patientId], (err, result) => {
          if (err) {
            console.error('Database error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to update prescription' }));
            return;
          }
          
          if (result.affectedRows === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Patient not found' }));
            return;
          }
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Prescription added successfully' }));
        });
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request data' }));
      }
    });
  }
  
  else if (pathname === '/api/prescriptions/unfilled' && req.method === 'GET') {
    const query = `
      SELECT p.uid, p.prescription, p.prescription_filled 
      FROM Patients p
      WHERE p.prescription IS NOT NULL 
      AND p.prescription_filled = 0
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to fetch prescriptions' }));
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    });
  }
  
  else if (pathname.match(/\/api\/prescriptions\/\d+/) && req.method === 'POST') {
    const uid = pathname.split('/').pop();
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { prescription_filled } = JSON.parse(body);
        const query = 'UPDATE Patients SET prescription_filled = ? WHERE uid = ?';
        
        db.query(query, [prescription_filled, uid], (err, result) => {
          if (err) {
            console.error('Database error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to update prescription status' }));
            return;
          }
          
          if (result.affectedRows === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Patient not found' }));
            return;
          }
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Prescription status updated successfully' }));
        });
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request data' }));
      }
    });
  }

 
  else if (pathname === '/api/prescriptions/search' && req.method === 'GET') {
      const { name } = parse(req.url, true).query;
      const query = `
        SELECT p.uid, p.prescription, p.prescription_filled, u.fname, u.lname  
        FROM Patients p
        JOIN Users u ON p.uid = u.uid
        WHERE CONCAT(u.fname, ' ', u.lname) LIKE ?
      `;
      db.query(query, [`%${name}%`], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to search prescriptions' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
      });
    }
  
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});