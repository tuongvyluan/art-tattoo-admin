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

export const formatDateForInput = (time) => {
	return moment(time).format('yyyy-MM-DD');
};

export const formatDateTimeForInput = (time) => {
	return moment(time).format('yyyy-MM-DDThh:mm');
}

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

export const isFuture = (date) => {
	return new Date(date) > new Date(moment().subtract(1, 'days'))
}

export const extractBookingStatusTimeline = (booking) => {
	const timeline = [];
	const bookingMeetings = booking.bookingMeetings;
	const l = booking.bookingMeetings ? booking.bookingMeetings.length : 0;
	let i = 0,
		j = 0;

	if (BOOKING_STATUS.COMPLETED === booking.status) {
		timeline.push({
			text: `Đã hoàn thành vào ngày ${formatDate(booking.meetingDate)}`,
			date: new Date(booking.meetingDate).toString(),
			id: 0
		});
		j++;
	}
	for (i; i < l; i++) {
		if (!isFuture(bookingMeetings.at(i).meetingDate)) {
			timeline.push({
				text: `Đã hoàn thành lịch hẹn vào ngày ${formatDate(
					bookingMeetings.at(i).meetingDate
				)}`,
				date: new Date(bookingMeetings.at(i).createAt).toString(),
				id: i + j
			});
		} else {
			timeline.push({
				text: `Đã tạo lịch hẹn vào ngày ${formatDate(bookingMeetings.at(i).meetingDate)}`,
				date: new Date(bookingMeetings.at(i).createAt).toString(),
				id: i + j
			});
		}
	}
	timeline.push({
		text: 'Đã đặt hẹn',
		date: new Date(booking.createdAt).toString(),
		id: i + j
	});
	return timeline;
};

export const formatPhoneNumber = (phoneNumber) => {
	return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 10)}`
}

export const hasBookingMeeting = (bookingMeetings) => {
	let result;
	if (
		bookingMeetings?.at(0)?.meetingDate &&
		isFuture(bookingMeetings?.at(0)?.meetingDate)
	) {
		result = new Date(bookingMeetings?.at(0)?.meetingDate);
	}
	return result;
};