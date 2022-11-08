const http = require('http')
const app = require('./app.js');

const PORT = 4000;

const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`server runing on port on ${PORT}`);
})