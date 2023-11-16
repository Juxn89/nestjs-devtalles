import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	
	@WebSocketServer() webSocketServer: Server

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleDisconnect(client: Socket) {
    // console.log(`Client disconnected --> ${ client.id }`);
		this.messagesWsService.removeClient(client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    // console.log(`Client connected --> ${ client.id }`);

		// console.log({
		// 	total: this.messagesWsService.getTotalConnectedClients()
		// })

		this.messagesWsService.registerClient(client);
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
			fullMessage: 'Me',
			message: payload.message || 'no-message!'
		})
	}
}
