import moment from 'moment';
import { BOOKING_STATUS } from './status';

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

export const formatDate = (time) => {
	return moment(time).format('DD-MM-yyyy');
};

export const randomFrom0To = (max) => Math.floor(Math.random() * max);

export const readJwt = (token) => {
	const jwtObj = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
	const keys = Object.keys(jwtObj);
	const resObj = {};
	let finalKey;
	keys.forEach((key, index) => {
		finalKey = key.split('/').reverse().at(0);
		resObj[finalKey] = jwtObj[key];
	});
	console.log(resObj);
	return resObj;
};

export const extractBookingStatusTimeline = (booking) => {
	const timeline = [];
	switch (booking.status) {
		case BOOKING_STATUS.COMPLETED:
			timeline.push({
				text: 'Đã hoàn thành',
				date: new Date(booking.meetingDate).toString(),
				id: 0
			});
			timeline.push({
				text: `Đã xác nhận lịch hẹn vào ngày ${formatDate(booking.meetingDate)}`,
				date: new Date(+new Date(booking.createdAt) + 80000000).toString(),
				id: 1
			});
			timeline.push({
				text: 'Đã đặt hẹn',
				date: new Date(booking.createdAt).toString(),
				id: 2
			});
			break;
		case BOOKING_STATUS.WAITING:
			timeline.push({
				text: 'Đã đặt hẹn',
				date: new Date(booking.createdAt).toString(),
				id: 0
			});
			break;
		case BOOKING_STATUS.PENDING:
			timeline.push({
				text: `Đã xác nhận lịch hẹn vào ngày ${formatDate(booking.meetingDate)}`,
				date: new Date(+new Date(booking.createdAt) + 80000000).toString(),
				id: 0
			});
			timeline.push({
				text: 'Đã đặt hẹn',
				date: new Date(booking.createdAt).toString(),
				id: 1
			});
			break;
		case BOOKING_STATUS.CONFIRMED:
			timeline.push({
				text: `Đã xác nhận lịch hẹn vào ngày ${formatDate(booking.meetingDate)}`,
				date: new Date(+new Date(booking.createdAt) + 80000000).toString(),
				id: 0
			});
			timeline.push({
				text: 'Đã đặt hẹn',
				date: new Date(booking.createdAt).toString(),
				id: 1
			});
			break;
		default:
			break;
	}
	return timeline;
};
