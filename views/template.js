export default ({ body, title }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel='stylesheet' href='/lib/font-awesome/font-awesome.min.css' />
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      
      <script id='setmore_script' type='text/javascript' src='https://my.setmore.com/js/iframe/setmore_iframe.js'></script>
      <script src="/assets/bundle.js"></script>
    </html>
  `;
};