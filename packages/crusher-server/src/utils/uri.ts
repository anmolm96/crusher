const url = require("url");

export function resolvePathToBackendURI(path: string) {
	if (!process.env.BACKEND_URL) {
		throw Error("No absolute url provided for backend");
	}

	return url.resolve(process.env.BACKEND_URL, path);
}

export function appendParamsToURI(uri: string, params) {
	const currentURL = new URL(uri);
	for (const paramKey of Object.keys(params)) {
		currentURL.searchParams.append(paramKey, params[paramKey]);
	}

	return currentURL.href;
}

export function checkIfAbsoluteURI(uri: string) {
	const rgx = /^https?:\/\//i;
	return rgx.test(uri);
}

export function resolvePathToFrontendURI(path: string) {
	return url.resolve(process.env.FRONTEND_URL || "/", path);
}
