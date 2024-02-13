import { Server } from 'socket.io';
import Connection from './database/db.js';
import { getDocument, updateDocument } from './controller/document-controller.js';

const PORT = 9000;

// Initialize database connection
Connection();

// Create a new Socket.IO server
const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('New connection:', socket.id);

  socket.on('get-document', async documentId => {
    try {
      const document = await getDocument(documentId);
      socket.join(documentId);
      socket.emit('load-document', document.data);
    } catch (error) {
      console.error("Error in get-document:", error);
      // Optionally, you can emit an error event to the client
    }

    socket.on('send-changes', delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on('save-document', async data => {
      try {
        await updateDocument(documentId, data);
      } catch (error) {
        console.error("Error in save-document:", error);
        // Optionally, you can emit an error event to the client
      }
    });
  });
});

console.log(`Server is listening on port ${PORT}`);
