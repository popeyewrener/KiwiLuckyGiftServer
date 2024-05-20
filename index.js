const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const socketIO = require('socket.io');
const mongooseConnector = require('./connectors/mongooseConnector');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/giftServer';
const mongoConnector = require("./connectors/mongoConnector");
const port = process.env.PORT || 3000;
const FullSocketController = require('./controllers/socket/fullController');
const GeneralSocketController = require('./controllers/socket/generalController');

app.use(cors({credentials:true, origin:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongooseConnector(dbUrl);
mongoConnector.connect(dbUrl);

const httpServer = require('http').createServer(app);

const io = socketIO(httpServer);

const fullNameSpace = io.of('/full');

const generalNameSpace = io.of('/general');

const baseNameSpace = io.of('/');


const fullSocketController = new FullSocketController(fullNameSpace);

const generalSocketController = new GeneralSocketController(generalNameSpace);  




baseNameSpace.on('connection', (socket) => {
    console.log("Base namespace entered")
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    console.log("IO connection entered")
});

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});