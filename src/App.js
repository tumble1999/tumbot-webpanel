import React from 'react';
import { ModuleList, ServerList, ViewList } from "./Lists";
import { ModuleEditor, PermissionEditor } from "./Editor.js";
import { getParams } from './params';

function App() {
	let {server,module,users}= getParams({server,module,users});
	if(!server)server = "all";
	if(!module)module = "core";

	console.log({server,module,users});

	let view,viewId = void 0 == users?"modules":"users";

	if(void 0 == users) {
		view = [
			<ModuleList key="module-list" serverId={server} moduleId={module} />,
			<ModuleEditor key="module-editor" serverId={server} moduleId={module} />
		]
	} else {
		view = <PermissionEditor serverId={server} />
	}

	return <div>
		<ServerList serverId={server}/>
		{/* <ViewList serverId={server} viewId={viewId} /> */}
		{view}
	</div>;
}


export default App;