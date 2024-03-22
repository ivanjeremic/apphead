export default eventHandler((event) => {
  //const name = getRouterParam(event, 'name')

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite App</title>
    </head>
    <body>
      <div id="root">kotz</div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
  `;
});
