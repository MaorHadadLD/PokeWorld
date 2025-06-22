const http = require('http'); 
const socketIo = require('socket.io'); 
const app = require('./app'); 


const server = http.createServer(app);


const io = socketIo(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'],
    }
});


app.set('io', io);


io.on('connection', (socket) => {
    console.log('Socket.IO: Client connected');

    socket.on('disconnect', () => {
        console.log('Socket.IO: Client disconnected');
    });
    
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));