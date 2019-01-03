const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use('/rooms/:id',express.static('client'));

app.use('/api/rooms/:id', proxy({ target: 'http://localhost:8080' }))
app.use('/rooms/:id/photos', proxy({ target: 'http://localhost:1337' }))
app.use('/house/', proxy({ target: 'http://localhost:3123' }))
app.use('/api/reviews/rooms/:roomid', proxy({ target: 'http://localhost:3124' }))
app.use('/api/ratings/rooms/:roomid', proxy({ target: 'http://localhost:3124' }))

app.listen(port, () => {
  console.log( `server listening on port: ${port}`)
});
