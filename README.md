
# DVGC – Detector de Vazamento de Gás de Cozinha

Projeto desenvolvido em grupo como parte de uma disciplina acadêmica com foco no tema **“Smart Cities”**. O **DVGC** (Detector de Vazamento de Gás Caseiro) é uma solução acessível e inovadora voltada à **segurança doméstica**, especialmente na **detecção de vazamentos de gás GLP**, um combustível amplamente utilizado em residências brasileiras.

> 🔥 **Selecionado entre os 5 melhores projetos** dos cursos de engenharia da instituição, o DVGC participou de **bootcamps e treinamentos com o SEBRAE** devido ao seu potencial de inovação e impacto social.

---

## 📱 Aplicativo Móvel

O app foi desenvolvido com **React Native** e **Expo**, com foco em uma experiência de usuário fluida e informativa:

- Interface minimalista e intuitiva  
- Gráficos interativos com leitura em tempo real da concentração de gás  
- Histórico de detecções com data e horário  
- Seção com **orientações práticas de emergência**, incluindo contatos úteis e instruções de evacuação  

---

## 🔧 Hardware e IoT

O dispositivo físico é baseado em **ESP32** e sensores de gás, combinando:

- **Programação em C++**
- **Eletrônica digital e analógica**
- Monitoramento constante da concentração de GLP no ar
- Envio de **alertas em tempo real** via Wi-Fi para o app móvel

---

## 🌐 Backend e Integração

O sistema de backend foi construído com:

- **Node.js** e **Express**
- Banco de dados **MySQL** para persistência e histórico
- API RESTful própria para comunicação entre o app e o dispositivo

---

## 📌 Funcionalidades

- Monitoramento contínuo de gás GLP
- Comunicação em tempo real entre dispositivo e app
- Armazenamento de dados e geração de histórico
- Alertas automáticos e visuais para o usuário
- Interface educacional e preventiva

---

## 🧠 Tecnologias e Conceitos Aplicados

| Categoria         | Ferramentas / Tecnologias                     |
|------------------|----------------------------------------------|
| Frontend         | React Native, Expo                           |
| Backend          | Node.js, Express                             |
| Banco de Dados   | MySQL                                        |
| IoT              | ESP32, C++, sensores de gás                  |
| Eletrônica       | Digital e Analógica                          |
| Metodologias     | Ágeis (Kanban)                               |
| Apoio            | SEBRAE – Bootcamps e treinamentos           |

---

## 🚀 Como Executar

### Frontend (React Native)

```bash
cd Front-End
npm install
npm start
```

> Requer Expo instalado no celular ou emulador configurado.

### Backend (Node.js + MySQL)

```bash
cd Back-End
npm install
npm start
```

> Certifique-se de que o MySQL está ativo e configure as variáveis de conexão no arquivo `.env`.

---

## 👨‍💻 Responsabilidades Individuais

Este projeto marcou minha **primeira experiência prática integrando software e hardware**. Minhas contribuições principais:

- Desenvolvimento do aplicativo móvel
- Integração do backend com o dispositivo físico
- Programação do ESP32 em C++
- Participação ativa na montagem e testes do protótipo

---

## 🧠 Backend – API RESTful com Node.js e MySQL

A API foi desenvolvida com **Node.js**, utilizando os módulos **Express**, **MySQL2**, **body-parser**, **bcrypt**, **crypto** e **jsonwebtoken**.

### 📌 Funcionalidades da API

| Rota             | Método | Descrição |
|------------------|--------|-----------|
| `/`              | GET    | Mensagem simples indicando o uso da API |
| `/alert`         | GET    | Retorna todos os registros da tabela `gas_alerts` |
| `/alert`         | POST   | Insere um novo alerta de gás (intensidade) |
| `/login`         | POST   | Autentica usuário com `username` e `password` |


### 🌐 Conexão com o Banco de Dados

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SUA_SENHA',
  database: 'gas_alerts_db'
});
```

Tabela esperada no banco de dados:

```sql
CREATE TABLE gas_alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gas_intensity FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔧 Execução

1. Inicie o servidor:
```bash
node index.js
```

2. O servidor estará disponível no IP local, por exemplo:
```
Servidor rodando em http://192.168.1.100:3000
```
