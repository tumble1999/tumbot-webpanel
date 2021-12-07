import { io } from 'socket.io-client';
let socket,botUrl;

export function setupConnection(url) {
	botUrl = url
	socket = io(url);

	socket.on("connect", () => {
		console.log("Connected to " + url);
	});

	socket.on("log", console.log);
}


export { socket,botUrl};