import React from 'react';
import Editor from "@monaco-editor/react";
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import { createToggle } from './util';

function getModules() {
	return {
		"core": {
			"title": "Tumbot Core",
			"description": "Core Stuff",
			"lang": "en-gb",
			"token": "****",
			"owner": "800774046799102037",
			"guilds": [
				"817721351825522718",
				"843953055389188157"
			],
			"prefix": "!",
			"commands": {
				"help": true,
				"ping": true,
				"eval": true
			}
		},
		"test": {
			"commands": {
				"hello": true
			}
		}
	};
}


function getModuleInfo(mid) {
	return getModules()[mid];

}
function getModuleNames() {
	return Object.keys(getModules());

}

function getModulePage(moduleId = "core") {

	let jsonToggle = createToggle(
		() => Array.from(document.getElementsByClassName("panel")).filter(
			panel => !panel.classList.contains("page-header")
		),
		target => target.innerText = ["JSON", "Back"][target.classList.contains("active") ? 1 : 0]
	),
		moduleInfo = getModuleInfo(moduleId),
		{ title, description, token, owner, guilds, ...moduleSettings } = moduleInfo,
		settings = [
			<div class="panel settings active">
				<h2>Settings</h2>
			</div>,
			<div class="panel commands active">
				<h2>Commands</h2>
			</div>
		],
		json = <div class="panel json">
			<h2>JSON</h2>
			<p>
				<Editor
					height="30vh"
					theme="vs-dark"
					defaultLanguage="json"
					defaultValue={JSON.stringify(moduleSettings, null, 2)}
				/>
			</p>
		</div>;

	return [
		<div id="modules" class="list">
			{getModuleNames().map(m =>
				<a href="#" class={moduleId == m ? "active" : ""} >{m[0].toUpperCase()}{m.substring(1, m.length)}</a>
			)}
		</div>,
		<div id="main">
			<div class="panel page-header">
				<h1>{moduleInfo.title}</h1>
				<a href="#" class="btn toggle-json" onClick={jsonToggle}>JSON</a>
				<p>{moduleInfo.description}</p>
			</div>
			{settings}
			{json}
		</div>
	];

}

export function App() {
	let page = getModulePage();
	return (
		<div id="dashboard" class="modules">
			<a id="header" href="#">
				<img src="assets/img/tumbot.svg" alt="tumblot_logo" />
				Server Name
				<Icon path={mdiChevronDown}
					title="User Profile"
					size={1} />
				<div id="server-list" class="list">
					<a href="#">
						<img src="assets/img/tumbot.svg" alt="tumblot_logo" />
						Server 1
					</a>
					<a href="#">
						<img src="assets/img/tumbot.svg" alt="tumblot_logo" />
						Server 2
					</a>
					<a href="#">
						<img src="assets/img/tumbot.svg" alt="tumblot_logo" />
						Server 3
					</a>
				</div>
			</a>
			<div id="nav">
				<a href="#" class="active">Modules</a>
				<a href="#">Users</a>
				<img src="assets/img/tumbot.svg" alt="tumblot_logo" />
			</div>
			{page}
		</div >
	);
}
