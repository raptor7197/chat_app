const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('client.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

const wss = new WebSocket.Server({ server });
const clients = new Map(); // Changed to Map to store client info
const usernames = new Set(); // Track usernames to prevent duplicates

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);

      if (message.type === 'join') {
        // Handle user joining
        if (usernames.has(message.username)) {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Username already taken. Please choose another.'
          }));
          return;
        }

        // Register user
        clients.set(ws, {
          username: message.username,
          joinTime: new Date()
        });
        usernames.add(message.username);

        console.log(`${message.username} joined the chat`);

        // Send welcome message to user
        ws.send(JSON.stringify({
          type: 'system',
          message: `Welcome to the chat, ${message.username}!`
        }));

        // Notify other users
        broadcast({
          type: 'system',
          message: `---> ${message.username} has joined the chat`,
          userCount: clients.size
        }, ws);

        // Send current user list
        ws.send(JSON.stringify({
          type: 'userList',
          users: Array.from(clients.values()).map(client => client.username),
          userCount: clients.size
        }));

      } else if (message.type === 'chat') {
        // Handle chat message
        const clientInfo = clients.get(ws);
        if (clientInfo) {
          console.log(`${clientInfo.username}: ${message.message}`);
          broadcast({
            type: 'chat',
            username: clientInfo.username,
            message: message.message,
            timestamp: new Date().toLocaleTimeString()
          });
        }
      }
    } catch (error) {
      // Handle legacy text messages (backward compatibility)
      console.log('Received legacy message:', data.toString());
      broadcast({
        type: 'chat',
        username: 'Anonymous',
        message: data.toString(),
        timestamp: new Date().toLocaleTimeString()
      });
    }
  });

  ws.on('close', () => {
    const clientInfo = clients.get(ws);
    if (clientInfo) {
      console.log(`${clientInfo.username} left the chat`);
      usernames.delete(clientInfo.username);
      clients.delete(ws);

      broadcast({
        type: 'system',
        message: ` ${clientInfo.username} has left the chat`,
        userCount: clients.size
      });
    }
  });
});

function broadcast(message, excludeClient = null) {
  const messageStr = typeof message === 'string' ? message : JSON.stringify(message);

  for (const [client, clientInfo] of clients) {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  }
}

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});


// Log server stats periodically
setInterval(() => {
  console.log(`Connected users: ${clients.size}`);
  if (clients.size > 0) {
    console.log('Active users:', Array.from(clients.values()).map(c => c.username).join(', '));
  }
}, 30000); // Every 30 seconds