import {
  WebSocketGateway, // Decorator to create a WebSocket gateway
  WebSocketServer,  // Decorator to mark the WebSocket server instance
  OnGatewayInit,    // Interface for initialization logic
  OnGatewayConnection, // Interface to handle client connections
  OnGatewayDisconnect, // Interface to handle client disconnections
} from '@nestjs/websockets'
import { Server } from 'socket.io' // Importing Server from socket.io to handle WebSocket communication
import { Injectable } from '@nestjs/common' // Injectable decorator for dependency injection

@Injectable() // Marks the class as injectable and available in the dependency injection system
@WebSocketGateway({
  cors: {
    origin: '*', // Allows cross-origin requests; adjust as needed for security
  },
})
export class TaskGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() // Marks this property as the WebSocket server instance
  server: Server // The Socket.IO server instance

  // Method triggered after the WebSocket server is initialized
  afterInit(server: Server) {
    console.log('WebSocket Server Initialized')
  }

  // Method called when a client connects to the WebSocket server
  handleConnection(client: any) {
    console.log('Client connected:', client.id) // Logs the connected client ID
  }

  // Method called when a client disconnects from the WebSocket server
  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id) // Logs the disconnected client ID
  }

  // Method to emit a task status update to all connected clients
  sendTaskStatusUpdate(taskId: number, status: string) {
    this.server.emit('taskStatusUpdated', { taskId, status }) // Sends the task status update event
  }
}
