import { io } from 'socket.io-client';
let socket;

export function setupConnection(ip) {
	socket = io(ip);

	socket.on("connect", () => {
		console.log("Connected to " + ip);
	});

	socket.on("log", console.log);
}


export { socket };