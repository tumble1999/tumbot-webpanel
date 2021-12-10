import React, { useEffect, useState } from 'react';
import { ModuleList, ServerList, ViewList } from "./Lists";
import { ModuleEditor, PermissionEditor } from "./Editor.js";
import { getParams } from './params';
import { setupConnection, socket, botUrl } from './bot';
import { Login } from './Login';

function login() {
	location.href = botUrl + "/auth/discord";
}

function HomePage() {
	return <div>
		<h1>Welcome</h1>
		<p>Welcome to Tumbot, please choose a server from above.</p>
	</div>
}

function Error({ code }) {
	let messages = {
		0: {
			title: "Loading",
			description: "Please wait, the page is loading."
		},

		200: {
			title: "Success",
			description: "Though if this message actually shows up then something is wrong."
		},
		404: {
			title: "Page Not Found",
			description: "The page was not found."
		},
		403: {
			title: "Access Denied",
			description: "You do not have access here."
		},
		999: {
			title: "Unknown Error",
			description: "There was an unknown error."
		},
	},
		message = messages[code] || messages[999];

	return <div>
		<h1>{message.title}</h1>
		<pre>Error: {code}</pre>
		<p>{message.description}</p>
	</div>;
}

function App() {
	let { server, module, users, stage, code } = getParams({ server, module, users, stage, code });
	if (!stage) stage = "unstable";
	let [response, updateResponse] = useState(0);



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
			socket.on("refreshLogin", login);
			socket.on("updateResponse", updateResponse);
			socket.emit("login", { code, serverId: server, moduleId: module });

			let url = new URL(location.href);
			url.searchParams.delete("code");
			window.history.replaceState("", "", url);

		}, [socket]);
	}


	if (!server) server = "all";
	if (!module) module = "core";

	console.log({ server, module, users });

	let view, viewId = void 0 == users ? "modules" : "users",
		views = {
			"modules": [
				<ModuleList stage={stage} key="module-list" serverId={server} moduleId={module} />,
				<ModuleEditor stage={stage} key="module-editor" serverId={server} moduleId={module} />
			]
		};

	switch (response) {
		case 200:
			view = views[viewId];
			if (!view)
				view = <p>Unknown View: {viewId}</p>;
			break;

		default:
			view = <Error code={response} />;
			break;
	}

	if(response==403&&server=="all") {
		view = <HomePage/>
	}

	return <div>
		<Login stage={stage} />
		<ServerList stage={stage} serverId={server} />
		{/* <ViewList  stage={stage} serverId={server} viewId={viewId} /> */}
		{view}
	</div>;
}


export default App;