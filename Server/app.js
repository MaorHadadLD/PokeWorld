const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const server = require('http').createServer(app);
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req,res) => {
    res.send('Api is running...');
});
app.set('io', io);

module.exports = app;