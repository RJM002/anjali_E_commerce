const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const allRouter = require('./Routes/indexRouter');
const { OAuth2Client } = require('google-auth-library');
const { getBotResponse } = require('./ChatBot/botLogic');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Change to your frontend URL if different
  methods: ["GET", "POST"],
  credentials: true, // Include credentials if needed
};

app.use(cors(corsOptions));

app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    const botResponse = getBotResponse(message);
    console.log('New client connected',botResponse);
        socket.emit('botResponse', botResponse);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/auth/google/callback', async (req, res) => {
    const { idToken } = req.body;
    console.log('Request for Google login is coming');
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log('User payload:', payload);
        res.json({
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});
app.get('/test', (req, res) => {
  res.send('Server is running!');
});

app.use('/api', allRouter);


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
