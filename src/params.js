
export function getParams(params={}) {
	const search = typeof window !== 'undefined'?window.location.search:null;
	let searchParams = new URLSearchParams(search);

	for (const key in params) {
		params[key] = searchParams.get(key);
	}
	return params;
}