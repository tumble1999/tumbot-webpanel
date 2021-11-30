import React, { useEffect } from 'react';
import { useState } from "react";
import { socket } from "./bot";

export function ServerList({serverId}) {
	let [servers, updateServers] = useState([]);

	useEffect(()=>{
		socket.on("updateServers", updateServers);
		socket.emit("getServers");
	},[socket])

	return <div>
		<h1>Servers</h1>
		<ul>
			{servers.map((server, i) =>
				<li key={"server-" + i}>
					<a href={`?server=${server}`} className={server==serverId?"active":""} >{server}</a>
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
		socket.emit("getModules");
	},[socket])

	return <div>
		<h1>Modules</h1>
		<ul>
			{modules.map((module, i) =>
				<li key={"module-" + i}>
					<a href={`?server=${serverId}&module=${module}`} className={module==moduleId?"active":""}>{module}</a>
				</li>
			)}
		</ul>
	</div>;
}