import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClients {
	[id: string]: Socket 
}

@Injectable()
export class MessagesWsService {
	private connectedClients: ConnectedClients = {}

	registerClient(client: Socket) {
		this.connectedClients[client.id] = client;
	}

	removeClient(clientID: string) {
		delete this.connectedClients[clientID]
	}

	getTotalConnectedClients(): number {
		return Object.keys(this.connectedClients).length;
	}

	getConnectedClients(): string[] {
		return Object.keys(this.connectedClients);
	}
}
