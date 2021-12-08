import React, { useEffect, useState } from 'react';
import { ModuleList, ServerList, ViewList } from "./Lists";
import { ModuleEditor, PermissionEditor } from "./Editor.js";
import { getParams } from './params';
import { setupConnection, socket, botUrl } from './bot';
import { Login } from './Login';

function login() {
	console.log("LOGIN")
	//location.href = botUrl + "/auth/discord";
}

function App() {
	let { server, module, users, stage, code } = getParams({ server, module, users, stage, code });
	if (!stage) stage = "unstable";



	if (socket) {
		if (code) {
			localStorage.setItem('tumbot-' + stage, code);

		} else {
			code = localStorage.getItem('tumbot-' + stage);
			if (!code) {
				login();
			}
		}
	} else {
		switch (stage) {
			case "sandbox":
				setupConnection("http://localhost:3000");
				break;
			case "unstable":
				setupConnection("https://tumbot-unstable.herokuapp.com");
				break;
			case "stable":
				setupConnection("https://tumbot-stable.herokuapp.com");
				break;
		}
	}
	if (code) {
		useEffect(() => {
			socket.on("refreshLogin",()=>{
				login();
			});

			socket.emit("login", {code, serverId:server,moduleId:module});

			let url = new URL(location.href);
			url.searchParams.delete("code");
			window.history.replaceState("", "", url)

		}, [socket]);
	}


	if (!server) server = "all";
	if (!module) module = "core";

	console.log({ server, module, users });

	let view, viewId = void 0 == users ? "modules" : "users";

	if (void 0 == users) {
		view = [
			<ModuleList stage={stage} key="module-list" serverId={server} moduleId={module} />,
			<ModuleEditor stage={stage} key="module-editor" serverId={server} moduleId={module} />
		];
	} else {
		//view = <PermissionEditor stage={stage} serverId={server} />;
	}

	return <div>
		<Login  stage={stage}/>
		<ServerList stage={stage} serverId={server} />
		{/* <ViewList  stage={stage} serverId={server} viewId={viewId} /> */}
		{view}
	</div>;
}


export default App;