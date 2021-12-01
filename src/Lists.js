import React, { useEffect } from 'react';
import { useState } from "react";
import { socket } from "./bot";

export function ServerList({serverId}) {
	let [servers, updateServers] = useState([]);

	useEffect(()=>{
		socket.on("updateServers", updateServers);
		socket.emit("getServers");
	},[socket])

	console.log("Servers:",servers);

	return <div>
		<h1>Servers</h1>
		<ul>
			{servers.map((server) =>
				<li key={"server_" + server.serverId}>
					<a href={`?server=${server.serverId}`} className={server.serverId==serverId?"active":""} >
						<img src={server.icon} alt="" />
						{server.name}
					</a>
				</li>
			)}
		</ul>
	</div>;
}

export function ViewList({serverId,viewId}) {
	return <div>
		<h1>View</h1>
		<ul>
			<li><a href={"?server="+serverId+"&modules"} className={viewId=="modules"?"active":""}>Modules</a></li>
			<li><a href={"?server="+serverId+"&users"} className={viewId=="users"?"active":""}>Users</a></li>
		</ul>
	</div>
}


export function ModuleList({serverId,moduleId}) {
	if(!moduleId) return;
	let [modules, updateModules] = useState([]);
	useEffect(()=>{
		socket.on("updateModules", updateModules);
		socket.emit("getModules",{serverId});
	},[socket])

	console.log("Modules:",modules);

	return <div>
		<h1>Modules</h1>
		<ul>
			{modules.map((module, i) =>
				<li key={"module-" + i}>
					<a href={`?server=${serverId}&module=${module.moduleId}`} className={module.moduleId==moduleId?"active":""}>{module.moduleId}</a>
				</li>
			)}
		</ul>
	</div>;
}