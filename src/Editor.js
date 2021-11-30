import React, { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import { socket } from "./bot";
import { AutoFormField } from "./Form";

export function PermissionEditor(info) {
	let [perms, updatePerms] = useState({}),
		[module, updateModule] = useState({});

	useEffect(() => {
		socket.on("updatePerms", updatePerms);
		socket.emit("getPerms", info);
	}, [socket]);

	return <p>Coming soon</p>

}

function CommandsEditor() {

}

export function ModuleEditor(info) {
	let [moduleConfig, updateModule] = useState({});

	useEffect(() => {
		socket.on("updateModule", updateModule);
		socket.emit("getModule", info);
	}, [socket]);

	return <div>
		<h1>{info.serverId}: {info.moduleId}</h1>
		<form onSubmit={(e) => {
			e.preventDefault();
			console.log(moduleConfig);
			socket.emit("updateModule", Object.assign({ moduleConfig}, info));
		}}>
			{Object.keys(moduleConfig).map(name =>{

				if(name=="commands") {
					let commands = moduleConfig.commands;
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
							<label htmlFor={cmd.id}> {moduleConfig.prefix+cmd.id}</label>
						</div>)}
					</div>
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
