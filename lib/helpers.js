import moment from 'moment';

// Capitalize
export const capitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// Lowercase
export const lowercase = (string) => {
	return string.toLowerCase();
};

// Format price
export const formatPrice = (number) => {
	const fnumber = parseFloat(number);
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'VND'
	}).format(fnumber);
};

export const formatTime = (time) => {
	return moment(time).format('DD-MM-yyyy HH:MM');
};

export const randomFrom0To = (max) => Math.floor(Math.random() * max);

export const readJwt = (token) => {
	const jwtObj = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
	const keys = Object.keys(jwtObj);
	const resObj = {}
	let finalKey
	keys.forEach((key, index) => {
		finalKey = key.split('/').reverse().at(0)
		resObj[finalKey] = jwtObj[key]
	})
	return resObj;
}