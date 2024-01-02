import moment from 'moment';
import {
	BOOKING_DETAIL_STATUS,
	BOOKING_MEETING_STATUS,
	BOOKING_STATUS,
	TRANSACTION_STATUS,
	stringPlacements,
	stringServiceCategories,
	stringSize
} from './status';

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
	if (!number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'VND'
		}).format(0);
	}
	const fnumber = parseFloat(number);
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'VND'
	}).format(fnumber);
};

export const formatTime = (time) => {
	return moment(time).format('DD-MM-yyyy HH:mm');
};

export const formatTimeForInput = (time) => {
	return moment(time).format('HH:mm');
};

export const formatDate = (time) => {
	return moment(time).format('DD-MM-yyyy');
};

export const formatDateForInputWithoutHour = (time) => {
	return moment(time).format('yyyy-MM-DD');
};

export const formatDateForInput = (time) => {
	return moment(time).format('yyyy-MM-DD').concat('T00:00:00');
};

export const formatDateTimeForInput = (time) => {
	return moment(time).format('yyyy-MM-DDTHH:mm');
};

export const formatMonthYear = (time) => {
	return moment(time).format(`MM/yyyy`);
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

export const isFuture = (date) => {
	return new Date(date) > new Date(moment().subtract(1, 'days'));
};

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
				text: `Đã tạo lịch hẹn vào ngày ${formatDate(
					bookingMeetings.at(i).meetingDate
				)}`,
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
	return phoneNumber
		? `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(
				7,
				10
		  )}`
		: '';
};

export const extractServiceName = (service) => {
	return `${service.title}, ${stringSize.at(service.size)}, 
	${stringPlacements.at(service.placement)}`;
};

export const extractServiceFromBookingDetail = (detail) => {
	return detail
		? `${detail.serviceTitle}, ${stringServiceCategories.at(
				detail.serviceCategoryId
		  )}, ${stringSize.at(detail.serviceSize)}, ${stringPlacements.at(
				detail.servicePlacement
		  )}`
		: '';
};

export const formatTimeWithoutSecond = (time) => {
	const times = time.split(':');
	return `${times.at(0)}:${times.at(1)}`;
};

export const hasBookingMeeting = (bookingMeetings) => {
	let result;
	if (bookingMeetings) {
		const meetings = bookingMeetings.sort(
			(a, b) => new Date(b.meetingTime).getTime() - new Date(a.meetingTime).getTime()
		);
		let meetingTime;
		let now = moment().add(-1, 'hours').valueOf();
		if (meetings?.at(0)?.meetingTime && isFuture(meetings?.at(0)?.meetingTime)) {
			let index = 0;
			let length = bookingMeetings.length;
			for (index; index < length; index++) {
				meetingTime = new Date(bookingMeetings.at(index)?.meetingTime);
				if (meetingTime > now) {
					if (bookingMeetings.at(index).status === BOOKING_MEETING_STATUS.PENDING) {
						result = meetingTime;
					}
				} else {
					break;
				}
			}
		}
	}
	return result;
};

export const showTextMaxLength = (text, maxLength) => {
	return text?.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
};

export const calculateTotalIncludingCancelled = (bookingDetails) => {
	if (!bookingDetails) {
		return 0;
	}
	let total = 0;
	bookingDetails.forEach((a) => {
		total += a.price;
	});
	return total;
};

export const calculateTotal = (bookingDetails) => {
	if (!bookingDetails) {
		return 0;
	}
	let total = 0;
	bookingDetails.forEach((a) => {
		if (
			a.status !== BOOKING_DETAIL_STATUS.CANCELLED &&
			a.status !== BOOKING_DETAIL_STATUS.NOT_COMPLETED
		) {
			total += a.price;
		}
	});
	return total;
};

export const calculateConfirmedTotal = (bookingDetails) => {
	if (!bookingDetails) {
		return 0;
	}
	let total = 0;
	bookingDetails.forEach((a) => {
		if (
			a.status === BOOKING_DETAIL_STATUS.IN_PROGRESS ||
			a.status === BOOKING_DETAIL_STATUS.COMPLETED ||
			a.status === BOOKING_DETAIL_STATUS.NOT_COMPLETED
		) {
			total += a.price;
		}
	});
	return total;
};

export const calculateBookingTransactions = (transactions) => {
	if (!transactions || transactions.length === 0) {
		return 0;
	}
	let total = 0;
	transactions.forEach((t) => {
		if (t.status === TRANSACTION_STATUS.AVAILABLE) {
			if (t.isRefund) {
				total -= t.price;
			} else {
				total += t.price;
			}
		}
	});
	return total;
};

export const calculateMinBookingTotal = (bookingDetails) => {
	if (!bookingDetails) {
		return 0;
	}
	let total = 0;
	bookingDetails.forEach((a) => {
		if (a.status === BOOKING_DETAIL_STATUS.COMPLETED) {
			total += a.price;
		}
	});
	return total;
};

export const optimizeImage = (image) => {
	return image.slice(0, 49) + 'q_auto,f_auto,g_auto/' + image.slice(49);
};
