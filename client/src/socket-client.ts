import { Manager } from 'socket.io-client'
import { Socket } from 'socket.io';

export const connectToServer = () => {
	const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

	const socket = manager.socket('/')

	addListerners(socket);
}

const addListerners = (socket: Socket) => {
	const serverStatusLabel = document.querySelector('#serverStatus')!;

	socket.on('connect', () => {
		console.log('Connected! :)')
		serverStatusLabel.innerHTML = 'Connected';
	})
	
	socket.on('disconnect', () => {
		console.log('Disconnected! :(')
		serverStatusLabel.innerHTML = 'Disconnected';
	})
}