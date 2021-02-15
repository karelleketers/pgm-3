/**
 * Our main application
 */

import registerSW from './registerSw.js';

/**
 * Function that will get some pokemon
 */
const getPokemon = async () => {
  const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5');
  const json = await pokemon.json()
  console.log(json.results);
}

/**
 * Sending a message to the service worker
 */
const sendMessageToSW = (message) => {
  if(navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  } else {
    console.log('There is no Service Worker controlling this page.');
  }
}

/**
 * Initiliaze the application
 */
const initApp = () => {
  document.querySelector('#btnHelloWorld').addEventListener('click', () => {
    sendMessageToSW({ action: "ping" })
  });
}

/**
 * The Logic
 */

// init the application
initApp();

// register service worker
registerSW();

// get pokemon
getPokemon();