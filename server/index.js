// server/index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Collaborative Note-Taking API');
});

// Socket.io connection
// io.on('connection', (socket) => {
//     console.log('New client connected');
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// server/index.js (add this inside the io.on('connection') block)
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('addNote', (note) => {
        // Broadcast the new note to all clients
        io.emit('newNote', note);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

