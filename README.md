# Multi-User WebSocket Chat Application

A real-time chat application built with Node.js WebSockets that allows multiple users to communicate with each other in a shared chat room.

## Features

- **Real-time messaging**: Instant message delivery using WebSocket connections
- **Multi-user support**: Multiple users can join and chat simultaneously
- **Username management**: Unique usernames with duplicate prevention
- **User presence**: See who's online and track user count
- **Join/leave notifications**: System messages when users connect or disconnect
- **Message timestamps**: All messages include time information
- **Clean web interface**: Simple, responsive HTML/CSS client
- **Error handling**: Graceful handling of connection issues and invalid usernames

## Project Structure

```
websockets/
├── server/
│   ├── server.js     # WebSocket server implementation
│   └── client.html   # Web-based chat client
├── README.md         # This file
└── .gitignore        # Git ignore rules
```

## Prerequisites

- Node.js (version 12 or higher)
- A modern web browser with WebSocket support

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd websockets
   ```
3. Install dependencies (only Node.js built-in modules are used):
   ```bash
   npm init -y  # Optional: create package.json
   ```

## Running the Application

1. Start the server:
   ```bash
   cd server
   node server.js
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Enter a username and start chatting!

## How It Works

### Server (`server.js`)

The server handles:
- **HTTP Server**: Serves the client HTML page
- **WebSocket Server**: Manages real-time connections
- **User Management**: Tracks connected users and prevents duplicate usernames
- **Message Broadcasting**: Distributes messages to all connected clients
- **Connection Monitoring**: Logs user activity and connection statistics

### Client (`client.html`)

The client provides:
- **Username Registration**: Join form with username validation
- **Chat Interface**: Message display area and input field
- **User List**: Shows all online users and user count
- **Real-time Updates**: Instant message and user status updates

## Message Types

The application uses JSON messages with different types:

- `join`: User joining the chat room
- `chat`: Regular chat messages
- `system`: Server notifications (user joined/left)
- `error`: Error messages (duplicate username, etc.)
- `userList`: Current list of online users

## Usage

1. **Join the Chat**:
   - Enter a unique username (max 20 characters)
   - Click "Join Chat" or press Enter

2. **Send Messages**:
   - Type your message in the input field
   - Click "Send" or press Enter

3. **View Online Users**:
   - See the list of currently connected users
   - Monitor real-time user count updates

## Technical Details

- **WebSocket Library**: Uses Node.js `ws` module
- **HTTP Server**: Built-in Node.js `http` module
- **Port**: Runs on port 3000 by default
- **Client Support**: Works with any modern web browser
- **Concurrent Users**: Supports multiple simultaneous connections

## Server Monitoring

The server automatically logs:
- User connections and disconnections
- Chat messages with usernames
- Periodic connection statistics (every 30 seconds)

## Customization

You can easily modify:
- **Port**: Change the port in `server.js` (line 115)
- **Styling**: Update CSS in `client.html`
- **Message Format**: Modify the JSON message structure
- **User Limits**: Add maximum user restrictions
- **Chat Features**: Add private messaging, rooms, etc.

## Browser Compatibility

This application works with all modern browsers that support:
- WebSocket API
- ES6 JavaScript features
- CSS3 styling

## Development

To extend this application:

1. **Add new message types** in both server and client
2. **Implement chat rooms** by modifying the broadcast function
3. **Add user authentication** with a login system
4. **Store chat history** using a database
5. **Add file sharing** capabilities

## Troubleshooting

- **Connection Issues**: Ensure the server is running on port 3000
- **Username Conflicts**: Try a different username if one is taken
- **Browser Support**: Use Chrome, Firefox, Safari, or Edge
- **Firewall**: Make sure port 3000 is not blocked

## License

This project is open source and available under the MIT License.
