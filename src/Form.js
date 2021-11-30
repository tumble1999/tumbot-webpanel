import React from 'react';
import Editor, { DiffEditor } from "@monaco-editor/react";

export function AutoFormField({ name, value: defaultValue, onChange }) {
	let type;
	switch (typeof defaultValue) {
		case "number":
			type = "number";
			break;
		case "string":
			if (defaultValue.includes("\n")) {
				return <textarea
					name={name}
					defaultValue={defaultValue}
					placeholder={name}
					onChange={onChange}
				/>;
			} else {
				type = "text";
				break;
			}
		case "array":
			return <ArrayField
				name={name}
				defaultValue={defaultValue}
				onChange={onChange}
			/>
		default:
			return <Editor
				name={name}
				height="30vh"
				theme="vs-dark"
				defaultLanguage="json"
				defaultValue={JSON.stringify(defaultValue, null, 2)}
				onChange={onChange}
			/>;
	}

	return <input
	type={type}
	name={name}
	defaultValue={defaultValue}
	placeholder={name}
	onChange={onChange}
	/>;
}