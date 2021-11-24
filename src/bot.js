import {io} from 'socket.io-client'
let server = "localhost:3000",
socket = io("localhost:3000")


socket.on("connect",()=>{
	console.log("Connected to " + server);
})

socket.on("log",console.log)



export {socket};