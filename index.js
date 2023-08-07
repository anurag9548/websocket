import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './app/routes/public.js'
import connect from './app/database/connect.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();

connect();


app.use(express.json());
app.use(cors());

app.use("/api", router);


const port = process.env.DB_PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

server.listen(port,  () => console.log(`node is listening on port: ${port}`))

global.io = io;
console.log(`connected with websocket client`)



 
  