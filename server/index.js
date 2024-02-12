import { Server } from 'socket.io';

const PORT = 9000;

const io = new Server(PORT, {
cors: {
    origin: "http://localhost:3000" , 
    methods: ['GET', 'POST']
}
});

io.on('connection', socket => {
    console.log("A user connected"); // This should log on any client connection

    socket.on('send-changes', delta => {
        console.log("Delta received", delta); // Corrected for clarity
    });
});
