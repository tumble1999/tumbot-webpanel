import React from 'react';
import { ModuleList, ServerList } from "./Lists";
import { ModuleEditor } from "./ModuleEditor.js";
import { getParams } from './params';

function App() {
	let {server,module}= getParams({server,module});

	return <div>
		<ServerList />
		<ModuleList />
		<ModuleEditor serverId={server||"all"} moduleId={module||"core"} />
	</div>;
}


export default App;