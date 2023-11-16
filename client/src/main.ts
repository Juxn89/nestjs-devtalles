import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
		<h1>WebSocket - Client</h1>
		<input id="jwtToken" placeholder="JWT"/>
    <button id="btnConnect">Connect</button>
		<br/>

		<span id="serverStatus">Offline</span>

		<ul id="clientes-ul">
		</ul>

		<form id="message-form">
			<input placeholder="message" id="message-input"/>
		</form>

		<h3>Messages</h3>
		<ul id="messages-ul"></ul>
  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btnConnect')!;

btnConnect.addEventListener('click', () => {
	if(jwtToken.value.trim().length < 1)
	  return alert('Enter a valid JWT')

	connectToServer(jwtToken.value.trim())
})
