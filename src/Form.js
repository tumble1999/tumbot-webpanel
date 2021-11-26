import React from 'react';
import Editor, { DiffEditor } from "@monaco-editor/react";

export function AutoFormField({ name, value, onChange }) {
	let type;
	switch (typeof value) {
		case "number":
			type = "number";
			break;
		case "string":
			if (value.includes("\n")) {
				return <textarea
					name={name}
					defaultValue={value}
					placeholder={name}
					onChange={onChange}
				/>;
			} else {
				type = "text";
				break;
			}
		default:
			return <Editor
				name={name}
				height="30vh"
				theme="vs-dark"
				defaultLanguage="json"
				defaultValue={JSON.stringify(value, null, 2)}
				onChange={onChange}
			/>;
	}

	return <input
	type={type}
	name={name}
	defaultValue={value}
	placeholder={name}
	onChange={onChange}
	/>;
}

export function AutoForm({obj,onChange}) {
	return Object.keys(obj).map(name =>
		<div key="name">
			<label htmlFor={name}>{name}</label>
			<AutoFormField
				name={name}
				value={obj[name]}
				onChange={onChange}
			/>
		</div>)
}