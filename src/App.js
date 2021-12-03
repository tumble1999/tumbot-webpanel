import React from 'react';
import { ModuleList, ServerList, ViewList } from "./Lists";
import { ModuleEditor, PermissionEditor } from "./Editor.js";
import { getParams } from './params';
import { setupConnection } from './bot';

function App() {
	let {server,module,users,stage}= getParams({server,module,users,stage});
	if(!stage) stage = "unstable";
	switch(stage) {
		case "sandbox":
			setupConnection("http://localhost:3000")
		break;
		case "unstable":
			setupConnection("https://tumbot-unstable.herokuapp.com")
		break;
		case "stable":
			setupConnection("https://tumbot-stable.herokuapp.com")
		break;
	}

	if(!server)server = "all";
	if(!module)module = "core";

	console.log({server,module,users});

	let view,viewId = void 0 == users?"modules":"users";

	if(void 0 == users) {
		view = [
			<ModuleList stage={stage} key="module-list" serverId={server} moduleId={module} />,
			<ModuleEditor stage={stage} key="module-editor" serverId={server} moduleId={module} />
		]
	} else {
		view = <PermissionEditor stage={stage} serverId={server} />
	}

	return <div>
		<ServerList stage={stage} serverId={server}/>
		{/* <ViewList  stage={stage} serverId={server} viewId={viewId} /> */}
		{view}
	</div>;
}


export default App;