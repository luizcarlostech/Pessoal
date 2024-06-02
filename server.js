const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const { nome, email, celular, mensagem } = req.body;

    // Verificação para ambiente de teste
    if (process.env.EMAIL_USER === 'teste@example.com') {
        console.log(`Simulação de envio de email:
Nome: ${nome}
Email: ${email}
Celular: ${celular}
Mensagem: ${mensagem}`);
        return res.status(200).send('Mensagem enviada com sucesso (simulação)');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Contato de ${nome}`,
        text: `Nome: ${nome}\nEmail: ${email}\nCelular: ${celular}\n\nMensagem:\n${mensagem}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar mensagem');
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send('Mensagem enviada com sucesso');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
