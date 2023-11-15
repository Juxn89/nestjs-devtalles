import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
		<h1>WebSocket - Client</h1>
		<span id="serverStatus">Offline</span>

		<ul id="clientes-ul">
		</ul>

		<form id="message-form">
			<input placeholder="message" id="message-input"/>
		</form>
  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
connectToServer()
