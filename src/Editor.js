import React, { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import { socket } from "./bot";
import { AutoFormField } from "./Form";

function CommandsEditor({serverId,moduleId,moduleConfig}) {
	let commands = moduleConfig.commands,
		[prefix, updatePrefix] = useState("");

	useEffect(() => {
		socket.on("updatePrefix", updatePrefix);
		// socket.emit("getPrefix",{serverId,moduleId});
	}, [socket]);

	commands = Object.keys(moduleConfig.commands).map(cmd=>({
		id:cmd,
		active:commands[cmd]?true:false
	}));
	// console.log(commands);
	return <div key={name} >
		<h2>Commands</h2>
		{commands.map(cmd=><div key={"command_"+cmd.id}>
			<input
			type="checkbox"
			name={cmd.id}
			id={cmd.id}
			defaultChecked={cmd.active}
			onChange={e=>{
				//e.preventDefault();
				let{name,checked} = e.target;
				console.log({[name]:checked});
				if(!moduleConfig.commands)moduleConfig.commands = {};
				moduleConfig.commands[name] = checked
				updateModule(moduleConfig)
			}}
			/>
			<label htmlFor={cmd.id}> {prefix+cmd.id}</label>
		</div>)}
	</div>
}

export function ModuleEditor({serverId,moduleId}) {
	let [moduleConfig, updateModule] = useState({});

	useEffect(() => {
		socket.on("updateModule", w=>{
			updateModule(w)
		});
		socket.emit("getModule", {serverId,moduleId});
	}, [socket]);

	return <div>
		<h1>{serverId}: {moduleId}</h1>
		<form onSubmit={(e) => {
			e.preventDefault();
			console.log(moduleConfig);
			socket.emit("updateModule", {serverId,moduleId,moduleConfig});
		}}>
			{Object.keys(moduleConfig).map(name =>{

				if(name=="commands") {
					return <CommandsEditor serverId={serverId} moduleId={moduleId} moduleConfig={moduleConfig} />
				}
				return <div key={name}>
			<label htmlFor={name}>{name}</label>
			<AutoFormField
				name={name}
				value={moduleConfig[name]}
				onChange={e=>{
					e.preventDefault();
					let{name,value} = e.target;
					moduleConfig[name] = value;
					updateModule(moduleConfig);
				}}
			/>
		</div>
})}
			<button type="submit">
				Submit
			</button>
		</form>
	</div>;
}
