import React, { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import { socket } from "./bot";
import { AutoForm } from "./Form";

export function ModuleEditor(info) {
	let [module, updateModule] = useState({}),
		[formData, updateFormData] = useState({});

	useEffect(() => {
		socket.on("updateModule", updateModule);
		socket.emit("getModule", info);
	}, [socket]);

	return <div>
		<h1>{info.serverId}: {info.moduleId}</h1>
		{/* <Editor
			height="30vh"
			theme="vs-dark"
			defaultLanguage="json"
			defaultValue={JSON.stringify(module, null, 2)}
		/> */}
		<form onSubmit={(e) => {
			e.preventDefault();
			socket.emit("updateModule", Object.assign({ moduleConfig: formData }, info));
		}}>
			<AutoForm obj={module} onChange={e=>{
				e.preventDefault();
				let{name,value} = e.target;
				updateFormData(Object.assign(formData,{[name]:value}))
			}} />
			
			<button type="submit">
				Submit
			</button>
		</form>
	</div>;
}
