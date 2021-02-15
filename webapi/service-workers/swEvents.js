/**
 * Demo Service Workers Events
 */

self.addEventListener("install", e => {
  console.log('Install event');
});

self.addEventListener("activate", e => {
  console.log('Activate event');
});

self.addEventListener("fetch", e => {
  console.log(`Fetching ${e.request.url}`);

  // During demo:
  // - checking the network tab!
  // - checking applications tab
  // - open multiple windows to check the fetch event

  // 1.
  // const response = new Response(`Fetching ${e.request.url}`);
  // e.respondWith(response);

  // 2.
  // const response = new Response(`The URL is ${e.request.url}`);
  // e.respondWith(response);

  // 3.
  // const response = new Response(
  //   `
  //     <!DOCTYPE html>
  //     <html lang="en">
  //       <head>
  //         <meta charset="UTF-8">
  //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>Service worker HTML generation</title>
  //       </head>
  //       <body>
  //         <h1>HTML coming from service worker</h1>
  //       </body>
  //     </html>
  //   `,
  //   {
  //     status: 200,
  //     statusText: "OK",
  //     headers: {
  //       "Content-type": "text/html"
  //     }
  //   }
  // );
  // e.respondWith(response);

  // 4.Fetch + Response .. Not done, because fetch is a promise
  // e.respondWith(fetch(e.request));

  // 5. Better approach
  // e.respondWith(new Promise((resolve, reject) => {
  //   fetch("/").then(response => {
  //     // do something...
  //     resolve(response);
  //   });
  // }));

  // 6. Request object in depth
  // const response = new Response(
  //   `
  //     <!DOCTYPE html>
  //     <html lang="en">
  //       <head>
  //         <meta charset="UTF-8">
  //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>Service worker HTML generation</title>
  //       </head>
  //       <body>
  //         <h1>HTML coming from service worker</h1>
  //         <ul>
  //           <li>Cache: ${e.request.cache}</li>
  //           <li>Credentials: ${e.request.credential}</li>
  //           <li>Destination: ${e.request.destination}</li>
  //           <li>Method: ${e.request.method}</li>
  //           <li>Referrer: ${e.request.referrer}</li>
  //         </ul>
  //       </body>
  //     </html>
  //   `,
  //   {
  //     status: 200,
  //     statusText: "OK",
  //     headers: {
  //       "Content-type": "text/html"
  //     }
  //   }
  // );
  // e.respondWith(response);

  // 7. Routing

  // const parsedUrl = new URL(e.request.url);
  // if(parsedUrl.pathname == "/") {
  //   return;
  // }

  // const response = new Response(`this is not a CSS file`);
  // e.respondWith(response);

  // 8. Dynamic Routing
  // const parsedUrl = new URL(e.request.url);
  // if(parsedUrl.pathname.match(/^\/api\/*/)) {
  //   const object = { className: "3PGM" }
  //   console.log('test');
  //   const jsonResponse = new Response(JSON.stringify(object), {
  //     status: 200,
  //     statusText: "OK",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  //   e.respondWith(jsonResponse);
  // }
});