import { Manager, Socket } from 'socket.io-client'

export const connectToServer = (jwtToken: string) => {
	const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
		extraHeaders: {
			'x-auth-token': jwtToken
		}
	});

	const socket = manager.socket('/')

	addListerners(socket);
}

const addListerners = (socket: Socket) => {
	const serverStatusLabel = document.querySelector('#serverStatus')!;
	const clientsUL = document.querySelector('#clientes-ul')!
	const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
	const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
	const messagesUl = document.querySelector('#messages-ul')!

	socket.on('connect', () => {
		console.log('Connected! :)')
		serverStatusLabel.innerHTML = 'Connected';
	})
	
	socket.on('disconnect', () => {
		console.log('Disconnected! :(')
		serverStatusLabel.innerHTML = 'Disconnected';
	})

	socket.on('clients-updated', (clients: string[]) => {
		let clientsHTML: string = '';

		clients.forEach(clientId => {
			clientsHTML += `<li>${clientId}</li>`
		})

		clientsUL.innerHTML = clientsHTML
	})

	messageForm.addEventListener('submit', (event) => {
		event.preventDefault();

		if(messageInput.value.trim().length < 1)
			return;

		socket.emit('message-from-client', { id: socket.id, message: messageInput.value } );
		messageInput.value = '';
	})

	socket.on('messages-from-server', (payload: { fullName: string, message: string }) => {
		console.log(payload)

		const newMessage = `
		<li>
		  <strong>${ payload.fullName }</strong>
		  <span>${ payload.message }</span>
		</li>`

		const li = document.createElement('li')
		li.innerHTML = newMessage
		messagesUl.append(li)
	})
}