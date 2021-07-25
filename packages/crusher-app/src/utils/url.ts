import { BACKEND_SERVER_URL, FRONTEND_SERVER_URL } from "@constants/other";

export const resolvePathToBackendURI = (endpoint: string) => getPathWithHost("/server" || BACKEND_SERVER_URL, endpoint);
export const resolvePathToFrontendURI = (endpoint: string) => getPathWithHost(FRONTEND_SERVER_URL || "", endpoint);

const getPathWithHost = (host: string, path: string): string => {
	const isBackslashPresent = host.split("")[host.length - 1] === "/";
	const hostName = isBackslashPresent ? host.slice(0, -1) : host;

	return hostName + path;
};

export function appendParamsToURI(url: string, params: { [paramKey: string]: string } = {}) {
	const currentURL = new URL(url);
	Object.keys(params).forEach((paramKey) => {
		currentURL.searchParams.append(paramKey, params[paramKey]);
	});

	return currentURL.href;
}

export function addQueryParamToPath(uri, params) {
	return params ? `${uri}?${params}` : `${uri}`;
}

export function checkIfAbsoluteURI(uri: string) {
	const rgx = /^https?:\/\//i;
	return rgx.test(uri);
}

export function getAbsoluteURIIfRelative(uri: string) {
	const isAbsolute = checkIfAbsoluteURI(uri);
	if (!isAbsolute) {
		uri = resolvePathToBackendURI(uri);
	}
	return uri;
}
