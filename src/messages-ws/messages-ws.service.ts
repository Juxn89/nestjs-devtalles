import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/users.entity';

interface ConnectedClients {
	[id: string]: {
		socket: Socket,
		user: User
	}
}

@Injectable()
export class MessagesWsService {
	constructor(
		private readonly authService: AuthService
	){}

	private connectedClients: ConnectedClients = {}

	async registerClient(client: Socket, userId: string) {
		try {
			const user = await this.authService.findUserById(userId);
			
			this.checkUserConnection(userId)
			this.connectedClients[client.id] = {
				socket: client,
				user: user
			};
		} catch (error) {
			throw new Error(error)
		}
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

	getUserFullName(socketId: string) {
		return this.connectedClients[socketId].user.fullName;
	}

	private checkUserConnection(userId: string) {
		for (const cliendId of Object.keys(this.connectedClients)) {
			const connectedClient = this.connectedClients[cliendId]

			if(connectedClient.user.id === userId) {
				connectedClient.socket.disconnect();
				break
			}
		}
	}
}
