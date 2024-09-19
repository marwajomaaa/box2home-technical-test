import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { Injectable } from '@nestjs/common'

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*', // Adjust as needed
  },
})
export class TaskGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  afterInit(server: Server) {
    console.log('WebSocket Server Initialized')
  }

  handleConnection(client: any) {
    console.log('Client connected:', client.id)
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id)
  }

  sendTaskStatusUpdate(taskId: number, status: string) {
    this.server.emit('taskStatusUpdated', { taskId, status })
  }
}
