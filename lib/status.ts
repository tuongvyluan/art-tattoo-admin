export const enum ROLE {
	CUSTOMER = 0,
	ARTIST = 1,
	STUDIO = 2,
	ADMIN = 3
}

export const enum ACCOUNT_STATUS {
	NOT_VERIFIED = 0,
	VERIFIED = 1,
	SUSPENDED = 2,
	DELETED = 3
}

export const enum CUSTOMER_STATUS {
	NOT_VERIFIED = 0,
	VERIFIED = 1,
	DELETED = 2
}

export const enum STUDIO_STATUS {
	NOT_VERIFIED = 0,
	VERIFIED = 1,
	DELETED = 2
}

export const enum SERVICE_SIZE {
	SMALL = 0,
	MEDIUM = 1,
	LARGE = 2,
	EXTRA = 3
}

export const stringSize = [
	'Size S (<8cm)',
	'Size M (8 - 15cm)',
	'Size L (15 - 30cm)',
	'Size XL (>30cm)'
];

export const stringColor = (isColor: boolean) => {
	return isColor ? 'Có màu' : 'Trắng đen';
};

export const stringDifficult = (isDifficult: boolean) => {
	return isDifficult ? 'Phức tạp' : 'Đơn giản';
};

export const enum PACKAGE_STATUS {
	IN_PROGRESS = 0,
	AVAILABLE = 1,
	EXPIRED = 2,
	CANCELLED = 3
}

export const enum PACKAGE_TYPE_STATUS {
	AVAILABLE = 0,
	UNAVAILABLE = 1,
	DELETED = 2
}

export const enum ARTIST_STATUS {
	AVAILABLE = 0,
	UNAVAILABLE = 1
}

export const enum BOOKING_STATUS {
	PENDING = 0,
	CONFIRMED = 1,
	IN_PROGRESS = 2,
	CUSTOMER_CANCEL = 3,
	STUDIO_CANCEL = 4,
	COMPLETED = 5
}

export const stringBookingStatuses = [
	'Chờ xác nhận',
	'Đã xác nhận',
	'Đang thực hiện',
	'Khách hàng huỷ',
	'Studio huỷ',
	'Đã hoàn thành'
];

export const operationNames = [
	'Full combo xăm',
	'Xăm',
	'Thiết kế',
	'Xoá xăm',
	'Sửa xăm/Xăm đè',
	'Xăm dặm lại',
	'Đi nét viền',
	'Tô màu'
];

export const enum TATTOO_ART_STATUS {
	AVAILABLE = 0,
	UNAVAILABLE = 1,
	DELETED = 2
}

export const enum TATTOO_ART_STAGE_STATUS {
	AVAILABLE = 0,
	UNAVAILABLE = 1,
	DELETED = 2
}

export const enum PLACEMENT {
	ANY = 0,
	FULL_BACK = 1,
	HALF_BACK = 2,
	FULL_CHEST = 3,
	HALF_CHEST = 4,
	NECK = 5,
	FACE = 6,
	ARM = 7,
	WRIST = 8,
	HAND = 9,
	SHOULDER = 10,
	THIGH = 11,
	FOOT = 12,
	BODY_SUIT = 13,
	RIB = 14,
	HIB = 15
}

export const stringPlacements = [
	'Vị trí khác',
	'Full lưng',
	'Nửa lưng',
	'Full ngực',
	'Nửa ngực',
	'Cổ',
	'Mặt',
	'Cánh tay/Bắp tay',
	'Cổ tay',
	'Bàn tay',
	'Vai',
	'Đùi/Bắp chân',
	'Bàn chân',
	'Body suit',
	'Mạn sườn',
	'Hông'
];

export const enum SERVICE_PLACEMENT {
	ANY = 0,
	FULL_BACK = 1,
	HALF_BACK = 2,
	FULL_CHEST = 3,
	HALF_CHEST = 4,
	FULL_BELLY = 5,
	HALF_BELLY = 6,
	FULL_LEG = 7,
	HALF_LEG = 8,
	FULL_ARM = 9,
	HALF_ARM = 10,
	FULL_SHOULDER = 11,
	HALF_SHOULDER = 12,
	BODYSUIT = 13
}

export const stringServicePlacement = [
	'Vị trí khác',
	'Full lưng',
	'Nửa lưng',
	'Full ngực',
	'Nửa ngực',
	'Full bụng',
	'Nửa bụng',
	'Full chân',
	'Nửa chân',
	'Full tay',
	'Full tay',
	'Full vai',
	'Nửa vai',
	'Bodysuit'
];
