console.log("We are a service worker!");

try {
  // importScripts("swEvents.js");
  importScripts("swEvents2.js");
} catch(e) {
  console.log(e.message);
}
