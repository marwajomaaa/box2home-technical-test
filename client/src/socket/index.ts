import { io, Socket } from "socket.io-client";

export class SocketIO_Client {
    private static localInstance: SocketIO_Client;
    private socket: Socket;

    private constructor() {
        // Initialize the socket connection
        this.socket = io(); // URL can be set later in the connect method
    }

    public static getInstance(): SocketIO_Client {
        if (!this.localInstance) {
            this.localInstance = new SocketIO_Client();
        }
        return this.localInstance;
    }

    public connect(url: string): void {
        this.socket = io(url);
        this.socket.on("connect", () => {
            console.log(`Connected to ${url}`);
        });
    }

    public emit(event: string, data: any): void {
        this.socket.emit(event, data);
        console.log(`Emitting event: ${event} with data:`, data);
    }

    public on(event: string, callback: any): void {
        this.socket.on(event, callback);
        console.log(`Listening for event: ${event}`);
    }

    public disconnect(): void {
        this.socket.disconnect();
        console.log("Disconnected from socket");
    }
}
