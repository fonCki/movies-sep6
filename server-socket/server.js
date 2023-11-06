const io = require('socket.io')(3000, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Function to get input and send it as a notification
  function sendPrompt() {
    readline.question('Enter a message for notification: ', (msg) => {
      // Emit the message to all connected clients
      socket.emit('notification', { id: Date.now(), message: msg, isNew: true });

      // You can continue to send prompts after a delay
      setTimeout(sendPrompt, 500); // adjust the delay as needed
    });
  }

  // Start the prompt loop
  sendPrompt();

  // Handle markAsRead event from client
  socket.on('markAsRead', (notificationId) => {
    console.log('Notification marked as read:', notificationId);
    // Acknowledge the receipt
    socket.emit('acknowledge', { status: 'ok', id: notificationId });
  });

  // To disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
    readline.close(); // Stop reading input when user disconnects
  });
});
