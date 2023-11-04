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
		currency: 'USD'
	}).format(fnumber);
};

export const formatTime = (time) => {
	return moment(time).format('DD-MM-yyyy HH:MM');
};

export const randomFrom0To = (max) => Math.floor(Math.random() * max);
