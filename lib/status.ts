export const enum ROLE {
	CUSTOMER = 0,
	ARTIST = 1,
	STUDIO = 2,
	ADMIN = 3
}

export const roleString = ['Khách hàng', 'Nghệ sĩ xăm', 'Quản lý tiệm xăm', 'Admin'];

export const enum ACCOUNT_STATUS {
	NOT_VERIFIED = 0,
	VERIFIED = 1,
	GOOGLE = 2,
	INACTIVE = 3,
	BANNED = 4
}

export const enum CUSTOMER_STATUS {
	ACTIVE = 0,
	DELETED = 1
}

export const enum PACKAGE_STATUS {
	AVAILABLE = 0,
	EXPIRED = 1,
	CANCELLED = 2
}

export const enum PACKAGE_TYPE_STATUS {
	AVAILABLE = 0,
	UNAVAILABLE = 1
}

export const enum ARTIST_STATUS {
	AVAILABLE = 0,
	UNAVAILABLE = 1 // Cannot be found on platform
}

export const enum STUDIO_STATUS {
	NOT_VERIFIED = 0,
	VERIFIED = 1,
	DELETED = 2
}

export const enum SERVICE_STATUS {
	AVAILABLE = 0,
	STUDIO_ONLY = 1,
	DELETED = 2
}

export const getServiceStatusColor = (status: number) => {
	if (status === 0) {
		return 'success';
	}
	if (status === 1) {
		return 'warning';
	}
	return 'failure';
};

export const getServiceStatusString = (status: number) => {
	if (status === 0) {
		return 'Mọi người';
	}
	if (status === 1) {
		return 'Khách hàng cũ';
	}
	return 'Không ai cả (đã xoá)';
};

export const enum SERVICE_SIZE {
	SMALL = 0,
	MEDIUM = 1,
	LARGE = 2,
	EXTRA = 3,
	ANY = 4
}

export const stringSize = [
	'Size S (<8cm)',
	'Size M (8 - 15cm)',
	'Size L (15 - 30cm)',
	'Size XL (>30cm)',
	'Size bất kỳ'
];

export const enum TRANSACTION_METHOD {
	CASH = 0,
	BANKING = 1,
	EWALLET = 2
}

export const stringTransactionMethod = ['Tiền mặt', 'Thẻ ngân hàng', 'Ví điện tử'];

export const stringServiceStatus = ['Đang thực hiện', 'Hoàn thành', 'Đã huỷ'];

export const stringColor = (isColor: boolean) => {
	return isColor ? 'Có màu' : 'Trắng đen';
};

export const stringDifficult = (isDifficult: boolean) => {
	return isDifficult ? 'Phức tạp' : 'Đơn giản';
};

export const enum BOOKING_STATUS {
	PENDING = 0,
	IN_PROGRESS = 1,
	CUSTOMER_CANCEL = 2,
	STUDIO_CANCEL = 3,
	COMPLETED = 4,
	NOT_COMPLETED = 5
}

export const stringBookingStatuses = [
	'Chờ xác nhận',
	'Đang thực hiện',
	'Khách hàng huỷ',
	'Studio huỷ',
	'Hoàn thành',
	'Đã dừng'
];

export const enum BOOKING_DETAIL_STATUS {
	PENDING = 0,
	IN_PROGRESS = 1,
	CANCELLED = 2,
	COMPLETED = 3,
	NOT_COMPLETED = 4
}

export const stringBookingDetailStatus = [
	'Chờ xác nhận',
	'Đang thực hiện',
	'Đã huỷ',
	'Hoàn thành',
	'Đã dừng'
];

export const stringBookingDetailStatusColor = [
	'yellow-100',
	'yellow-300',
	'red-300',
	'green-300',
	'red-300'
];

export const enum BOOKING_MEETING_STATUS {
	PENDING = 0,
	COMPLETED = 1,
	CUSTOMER_CANCEL = 2,
	ARTIST_CANCEL = 3,
	STUDIO_CANCEL = 4
}

export const stringBookingMeetingStatus = [
	'Đang chờ',
	'Hoàn thành',
	'Khách hàng huỷ',
	'Nghệ sĩ huỷ',
	'Tiệm xăm huỷ'
];

export const stringBookingMeetingColors = [
	'warning',
	'success',
	'failure',
	'failure',
	'failure'
];

export const enum TRANSACTION_STATUS {
	AVAILABLE = 0,
	DELETED = 1
}

export const operationNames = ['Khác', 'Trọn gói', 'Xoá xăm', 'Dặm lại', 'Sửa xăm'];

export const getTattooArtIsCompleted = (value:boolean) => {
	return value ? 'Đã hoàn thành' : 'Đang thực hiện'
}

export const enum TATTOO_ART_STATUS {
	AVAILABLE = 0,
	UNAVAILABLE = 1,
	DELETED = 2
}

export const getTattooArtStatusString = [
	'Hiển thị',
	'Bị khoá',
	'Đã xoá'
]

export const enum TATTOO_ART_STAGE_STATUS {
	UNAVAILABLE = 0,
	AVAILABLE = 1,
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
	'Vị trí bất kỳ',
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
	'Vị trí bất kỳ',
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

export const stringTattooStages = [
	'Thiết kế',
	'Đi nét',
	'Đánh bóng',
	'Tô màu',
	'Sau xăm',
	'Bảo hành',
	'Khác'
];

export const stringBookingServiceStatus = ['Đang thực hiện', 'Hoàn thành', 'Đã huỷ'];

export const stringBookingServiceStatusColor = [
	'yellow-300',
	'green-300',
	'red-300'
];

export const enum SERVICE_CATEGORY {
	NEW_TATTOO = 0, // Xăm hình mới
	COVER_UP = 1, // Xăm đè lên hình cũ
	AFTERCARE = 2, // Bảo hành, sửa lỗi cho hình xăm có sẵn
	REMOVAL = 3, // Xoá xăm
	CONSULT = 4
}

export const stringServiceCategories = [
	'Xăm hình mới',
	'Xăm đè',
	'Bảo hành sau xăm',
	'Xoá xăm',
	'Tư vấn'
];
