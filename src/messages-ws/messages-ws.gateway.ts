import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	
	@WebSocketServer() webSocketServer: Server

  constructor(
		private readonly messagesWsService: MessagesWsService,
		private readonly jwtService: JwtService
	) {}

  handleDisconnect(client: Socket) {
    // console.log(`Client disconnected --> ${ client.id }`);
		this.messagesWsService.removeClient(client.id);
  }

  async handleConnection(client: Socket, ...args: any[]) {
		const token: string = client.handshake.headers['x-auth-token'] as string
		let payload: IJwtPayload;

		try {
			payload = this.jwtService.verify(token);
			await this.messagesWsService.registerClient(client, payload.id);
		} catch (error) {
			client.disconnect();
			return;
		}
    // console.log(client);

		// console.log({
		// 	total: this.messagesWsService.getTotalConnectedClients()
		// })
		
		this.webSocketServer.emit('clients-updated', this.messagesWsService.getConnectedClients())	
  }

	@SubscribeMessage('message-from-client')
	handleMessageFromClient(client: Socket, payload: NewMessageDto) {
		console.log(client.id, { payload });

		// Emitir solo al client
		// client.emit('messages-from-server', {
		// 	fullMessage: 'Me',
		// 	message: payload.message || 'no-message!'
		// })

		// Emitir a todos menos al client
		// client.broadcast.emit('messages-from-server', {
		// 	fullMessage: 'Me',
		// 	message: payload.message || 'no-message!'
		// })

		// Emitir a todos incluyendo al client
		this.webSocketServer.emit('messages-from-server', {
			fullName: this.messagesWsService.getUserFullName(client.id),
			message: payload.message || 'no-message!'
		})
	}
}
