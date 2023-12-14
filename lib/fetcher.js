import { format } from 'url';

const baseUrl =
	process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEURL : '';

export const fetcherFile = async (path, file) => {
	const url = path.includes('https://', 'http://')
		? path
		: `${baseUrl || ''}${format(path)}`;

	const res = await fetch(url, {
		method: 'POST',
		body: file
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text);
	}
	const result = await res.json();
	return result;
};

export const fetcher = async (path) => {
	const url = path.includes('https://', 'http://')
		? path
		: `${baseUrl || ''}${format(path)}`;

	const res = await fetch(url);
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text);
	}
	const result = await res.json();
	return result;
};

export const fetcherPost = async (path, body) => {
	const url = path.includes('https://', 'http://')
		? path
		: `${baseUrl || ''}${format(path)}`;

	const res = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text);
	}
	const result = await res.json();
	return result;
};

export const fetcherPut = async (path, body) => {
	const url = path.includes('https://', 'http://')
		? path
		: `${baseUrl || ''}${format(path)}`;

	const res = await fetch(url, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text);
	}
	const result = await res.json();
	return result;
};

export const fetcherGetWithToken = async (path, token) => {
	const url = path.includes('https://', 'http://')
		? path
		: `${baseUrl || ''}${format(path)}`;

	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text);
	}
	const result = await res.json();
	return result;
};

export const fetcherDelete = async (path) => {
	const url = path.includes('https://', 'http://')
		? path
		: `${baseUrl || ''}${format(path)}`;

	const res = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text);
	}
	const result = await res.json();
	return result;
};

export const fetcherDeleteWithToken = async (path, token) => {
	const url = path.includes('https://', 'http://')
		? path
		: `${baseUrl || ''}${format(path)}`;

	const res = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text);
	}
	const result = await res.json();
	return result;
};

export const fetcherPutWithToken = async (path, body, token) => {
	const url = path.includes('https://', 'http://')
		? path
		: `${baseUrl || ''}${format(path)}`;

	const res = await fetch(url, {
		method: 'PUT',
		body: body,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text);
	}
	const result = await res.json();
	return result;
};

export const fetcherPostWithToken = async (path, body, token) => {
	const url = path.includes('https://', 'http://')
		? path
		: `${baseUrl || ''}${format(path)}`;

	const res = await fetch(url, {
		method: 'POST',
		body: body,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text);
	}
	const result = await res.json();
	return result;
};
