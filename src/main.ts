import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { charmander } from './bases/05-decorators.ts'

// import { name, lastName } from './bases/01-types.ts'
// import { pokemonsIds } from './bases/02-objects.ts'
// import { Pokemon } from './bases/03-classes.ts'
// import { charmander } from './bases/04-injection-dependency.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
	<div>
		${ charmander.name }
	</div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
