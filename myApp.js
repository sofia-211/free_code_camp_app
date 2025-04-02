const express = require('express');
const helmet = require("helmet");
const app = express();




app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
const timeInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({maxAge: timeInSeconds, force: true}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],  
      scriptSrc: ["'self'", 'trusted-cdn.com'],
    }
  })
);


app.use(helmet({
  frameguard: { action: 'deny' }, // Configura frameguard para evitar ataques de "clickjacking"
  contentSecurityPolicy: { // Habilita y configura CSP
    directives: {
      defaultSrc: ["'self'"],  // Solo permite recursos del propio sitio
      scriptSrc: ["'self'", "trusted-cdn.com"]  // Scripts solo desde el propio sitio y un CDN confiable
   }
  },
  dnsPrefetchControl: false // Deshabilita DNS prefetching
}));


const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
 console.log(`Useful Programmer Info Security started on port ${PORT}`);
});



















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Your app is listening on port ${port}`);
});
