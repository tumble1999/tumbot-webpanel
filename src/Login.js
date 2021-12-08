import React, { useEffect, useState } from "react";
import { socket } from "./bot";


export function Login({stage}) {
	let [login, updateLogin] = useState({});

	useEffect(() => {
		socket.on("updateLogin",updateLogin);
	},[socket]);

	console.log(login);

	return <p>Logged in as: {login.username}
	<button onClick={
		()=>{
			localStorage.removeItem("tumbot-"+stage)
			socket.emit("logout")
			location.href = "/logged-out"

		}
	}>Logout</button>
	</p>
}