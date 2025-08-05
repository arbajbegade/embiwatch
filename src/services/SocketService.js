import io from 'socket.io-client';

// const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
const SOCKET_URL = 'http://localhost:9009';

class SocketService {
  socket = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        reconnection: true,
        reconnectionAttempts: 5,
      });
    }
    console.log('Connected');
    return this.socket;
  }

  on(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, callback);
    }
  }

  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService();