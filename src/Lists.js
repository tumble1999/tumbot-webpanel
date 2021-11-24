import React, { useEffect } from 'react';
import { useState } from "react";
import { socket } from "./bot";

export function ServerList() {
	let [servers, updateServers] = useState([]);

	useEffect(()=>{
		socket.on("updateServers", updateServers);
		socket.emit("getServers");
	},[socket])

	return <div>
		<h1>Servers</h1>
		<ul>
			{servers.map((server, i) =>
				<li key={"server-" + i}>{server}</li>
			)}
		</ul>
	</div>;
}


export function ModuleList() {
	let [modules, updateModules] = useState([]);
	useEffect(()=>{
		socket.on("updateModules", updateModules);
		socket.emit("getModules");
	},[socket])

	return <div>
		<h1>Modules</h1>
		<ul>
			{modules.map((module, i) =>
				<li key={"module-" + i}>{module}</li>
			)}
		</ul>
	</div>;
}