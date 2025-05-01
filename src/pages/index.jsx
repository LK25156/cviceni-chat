import { render } from '@czechitas/render';
import '../global.css';
import './index.css';

//fetch() se volá na API serveru, aby získal seznam zpráv, await resp.json() převede odpověď na javascriptový soubor

const odpovedi = async () => {
  const resp = await fetch('https://czechichat.deno.dev/api/list-messages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await resp.json()
}


//vykreslení stránky do <div className="vypis", kde se každá zpráva zobrazí uvnitř <p>
//formular umožňuje napsat své jméno a zprávu odeslat

const odpovedZpravy = await odpovedi()

document.querySelector('#root').innerHTML = render(
  <>
    <form className='form'>
      <label>Zde napiš své jméno: <input id="name" type='text'></input></label>
      <label>Zde napiš text: <input id="text" type='text'></input></label>
      <button type='submit'>Odeslat</button>
    </form>

    <div className='vypis'>
      {odpovedZpravy.messages.map(({message}) => <p key={message}>{message}</p>)}
    </div>
  </>
);


//odeslání nové zprávy
//fce sendMessage odesílá zprávu na server pomocí HTTP POST požadavku
//JSON.stringify ({name: jmeno,message: zprava,}), převede data formátu JSON,aby server rozuměl požadavku

const sendMessage = (jmeno, zprava) => {
  fetch('https://czechichat.deno.dev/api/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: jmeno,
      message: zprava,
    }),
  });
};


//zabrání se výchozímu odeslání dat
//zpráva se odešle pomocí sendMessage(), kde se získávají hodnoty z <input> polí
//document.querySelector("#text").value = ""; vyčištění pole po odeslání
//window.location.reload(); obnovení stránky, aby se zobrazila nová zpráva

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();

  sendMessage(document.querySelector("#name").value, document.querySelector("#text").value)
  document.querySelector("#text").value = "";

  window.location.reload();
});












/*document.querySelector('#root').innerHTML = render(
  
);*/
