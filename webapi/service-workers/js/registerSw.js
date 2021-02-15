export default () => {
  // check if serviceworker behaviour is available
  if('serviceWorker' in navigator)
  {
    // get the output DOM element
    const output = document.querySelector('#output')

    // register the service worker
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        // get the scope of the services worker
        // add option { scope: ... } to change the scope
        const scope = registration.scope;
        // registration.active
        // registration.waiting
        // registration.installing
        output.innerHTML = `Service Worker registered at ${scope}!`
      })
      .catch(error => {
        output.innerHTML = "Service Worker not registered!"
      });

    // when receiving a message
    navigator.serviceWorker.addEventListener("message", e => {
      switch (e.data.action) {
        case "pong": console.log("Client received a pong!");
      }
    })
  }

  // if service workers are not available
  else {
    output.innerHTML = "Service Worker is not available."
  }

  // NOTE: other way to get the registration
  // if('serviceWorker' in navigator) {
  //   navigator.serviceWorker.getRegistration()
  //     .then(registration => {
  //       registration.addEventListener('updatefound', e => {
  //         const swInstalling = registration.installing;
  //         swInstalling.addEventListener('statechange', () => {
  //           if(swInstalling.state = 'installing') {
  //             // maybe asking to refresh
  //           }
  //         })
  //       })
  //     })
  //     .catch(error => { });
  // }
}