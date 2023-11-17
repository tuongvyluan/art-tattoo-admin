import { stringServicePlacement, stringSize } from './status';

const { formatPrice } = require('./helpers');

export const calculateServiceKey = (service) => {
	let difficulty = 0;
	if (service.hasColor) {
		difficulty += 1;
	}
	if (service.isDifficult) {
		difficulty += 5;
	}
	return 100 * service.placement + 10 * service.size + difficulty;
};

export const calculateServiceKeyFromField = (
	placement,
	size,
	hasColor,
	isDifficult
) => {
	let difficulty = 0;
	if (hasColor) {
		difficulty += 1;
	}
	if (isDifficult) {
		difficulty += 5;
	}
	return 100 * placement + 10 * size + difficulty;
};

export const getPriceRange = (minPrice, maxPrice) => {
	return `${formatPrice(minPrice / 1000)}k - ${formatPrice(maxPrice / 1000)}k`;
};

export const getPlacement = (key) => {
	return Math.floor(key / 100);
};

export const getSize = (key) => {
	return Math.floor((key - getPlacement(key) * 100) / 10);
};

export const getDifficult = (key) => {
	return key % 10 >= 5;
};

export const getColor = (key) => {
	return key % 5 === 1;
};

export const generateServiceFromKey = (key, minPrice, maxPrice, ink) => {
	const placement = getPlacement(key);
	const size = getSize(key);
	const isDifficult = getDifficult(key);
	const hasColor = getColor(key);
	return {
		placement: placement,
		size: size,
		isDifficult: isDifficult,
		hasColor: hasColor,
		minPrice: minPrice,
		maxPrice: maxPrice,
		ink: ink
	};
};

export const serviceListToMap = (serviceList) => {
	if (serviceList && serviceList.length > 0) {
		const map = new Map();
		serviceList.map((service) => {
			map.set(calculateServiceKey(service), service);
		});
		return map;
	}
	return null;
};

export const defaultServiceMap = () => {
	const map = new Map();
	let key;
	let placement = 0;
	stringSize.map((size, sizeIndex) => {
		key = placement * 100 + sizeIndex * 10; // difficult: false, color: false
		map.set(key, generateServiceFromKey(key, 0, 0, ''));
		key = placement * 100 + sizeIndex * 10 + 1; // difficult: false, color: true
		map.set(key, generateServiceFromKey(key, 0, 0, ''));
		key = placement * 100 + sizeIndex * 10 + 5; // difficult: true, color: false
		map.set(key, generateServiceFromKey(key, 0, 0, ''));
		key = placement * 100 + sizeIndex * 10 + 6; // difficult: true, color: true
		map.set(key, generateServiceFromKey(key, 0, 0, ''));
	});
	let size = 3;
	stringServicePlacement.map((placement, placementIndex) => {
		if (placementIndex > 0) {
			key = placementIndex * 100 + size * 10; // difficult: false, color: false
			map.set(key, generateServiceFromKey(key, 0, 0, ''));
			key = placementIndex * 100 + size * 10 + 1; // difficult: false, color: true
			map.set(key, generateServiceFromKey(key, 0, 0, ''));
			key = placementIndex * 100 + size * 10 + 5; // difficult: true, color: false
			map.set(key, generateServiceFromKey(key, 0, 0, ''));
			key = placementIndex * 100 + size * 10 + 6; // difficult: true, color: true
			map.set(key, generateServiceFromKey(key, 0, 0, ''));
		}
	});
	return map;
};
