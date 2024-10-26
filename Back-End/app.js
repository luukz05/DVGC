const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt")
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const os = require('os');

const app = express();
const port = 3000;

const secretKey = crypto.randomBytes(16).toString("hex");

const db = mysql.createConnection({ //criando conexão com o banco de dados
  host: 'localhost',
  user: 'root',
  password: 'Arrastapracima#69420',
  database: 'gas_alerts_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

app.use(bodyParser.json());

// Rota GET para exibir o conteúdo da página
app.get('/', (req, res) => {
  res.send('/alert para ver os alertas');
});

app.get('/alert', (req, res) => {
  const query = 'SELECT * FROM gas_alerts';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar alertas:', err);
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});

app.post('/alert', (req, res) => {
  const { gasIntensity } = req.body;
  const query = 'INSERT INTO gas_alerts (gas_intensity) VALUES (?)';
  db.query(query, [gasIntensity], (err, result) => {
    if (err) throw err;
    console.log('Alerta de gás butano recebido e armazenado.');
    res.sendStatus(200);
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";

  db.query(query, [username, password], (err, results) => {
      if (err) {
          console.error("Erro ao fazer login: " + err.stack);
          return res.status(500).json({ success: false, error: "Erro na autenticação" });
      }

      if (results.length === 0) {
          return res.status(401).json({ success: false, error: "Usuário ou senha incorretos" });
      }

      const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
      res.json({ success: true, token });
  });
});

// Get the local IPv4 address
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (let interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i];
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return '127.0.0.1';
}

//TRUNCATE TABLE gas_alerts; - LIMPAR API

const ip = getLocalIpAddress();

app.listen(port, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
});
