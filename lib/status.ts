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
  'Size XL (>30cm)',
]

export const stringColor = (isColor : boolean) => {
  return isColor ? 'Có màu' : 'Trắng đen'
}

export const stringDifficult = (isDifficult : boolean) => {
  return isDifficult ? 'Phức tạp' : 'Đơn giản'
}

export const enum PACKAGE_STATUS {
	PENDING = 0,
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
	COMPLETED = 1,
	CANCELLED = 2,
	DELETED = 3
}

export const stringBookingStatuses = [
	'Đang thực hiện',
	'Đã hoàn thành',
	'Đã huỷ',
	'Đã xoá'
];

export const operationNames = [
	'Xăm',
	'Thiết kế',
	'Xăm đè',
	'Xăm dặm lại',
	'Xoá xăm',
]

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
