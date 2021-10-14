import React from 'react';
import Editor from "@monaco-editor/react";
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import { createToggle } from './util';

let TumbotIcon = <img src="assets/img/tumbot.svg" alt="tumblot_logo" />

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
			<div className="panel settings active">
				<h2>Settings</h2>
			</div>,
			<div className="panel commands active">
				<h2>Commands</h2>
			</div>
		],
		json = <div className="panel json">
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
		<div id="modules" className="list">
			{getModuleNames().map(m =>
				<a href="#" className={moduleId == m ? "active" : ""} >{m[0].toUpperCase()}{m.substring(1, m.length)}</a>
			)}
		</div>,
		<div id="main">
			<div className="panel page-header">
				<h1>{moduleInfo.title}</h1>
				<a href="#" className="btn toggle-json" onClick={jsonToggle}>JSON</a>
				<p>{moduleInfo.description}</p>
			</div>
			{settings}
			{json}
		</div>
	];

}


function App() {
	let section = "modules";
	return (
		<div id="dashboard" className={section}>
			<ServerSelector />
			<Nav />
			<Sidebar section={section} />
			<Content section={section} />
		</div >
	);
}



function ServerSelector() {
	return (
		<a id="header" href="#">
			{TumbotIcon}Server Name
			<Icon path={mdiChevronDown}
				title="User Profile"
				size={1} />
			<div id="server-list" className="list">
				<a href="#">
				{TumbotIcon}Server Name
				</a>
				<a href="#">
				{TumbotIcon}Server Name
				</a>
				<a href="#">
				{TumbotIcon}Server Name
				</a>
			</div>
		</a>
	);
}

function Nav() {
	return (
		<div id="nav">
			<a href="#" className="active">Modules</a>
			<a href="#">Users</a>
			<img src="assets/img/tumbot.svg" alt="tumblot_logo" />
		</div>
	);
}

function Sidebar({ section }) {
	switch (section) {
		case "modules":
			return (<div id="modules" className="list">
				<a href="#" >Module</a>
			</div>);
	}
	return null;

}
function Content({ section }) {
	switch (section) {
		case "modules":
			return (
				<div id="main">
					<div className="panel page-header">
						<h1>Module Title</h1>
						<a href="#" className="btn toggle-json">JSON</a>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut molestias nihil tempore repellat dignissimos iure vitae eius quae! Eum veniam voluptate unde quia laborum modi in, sequi praesentium ratione sed.</p>
					</div>
				</div>);
	}

}



export default App;