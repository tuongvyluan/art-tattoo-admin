export enum REPORT_TYPE {
	InproperContent = 0,
	HarassmentBullying = 1,
	HateSpeech = 2,
	Violence = 3,
	UnauthorizeSales = 4,
	Fake = 5,
	Scam = 6,
	FakePage = 7,
	FalseInfo = 8,
	Spam = 9,
	Copyrigth = 10,
	Plagiarism = 11
}

export const stringReports = [
	'Nội dung không phù hợp',
	'Quấy rối',
	'Ngôn từ gây thù ghét',
	'Bạo lực',
	'Bán hàng trái phép',
	'Giả mạo',
	'Gian lận/ lừa đảo',
	'Trang giả',
	'Thông tin sai lệch',
	'Spam',
	'Vi Phạm quyền sở hữu ',
	'Đạo tác phẩm'
];

export const filterReportStatus = [
	'Tất cả',
	'Chờ xử lý',
	'Không vi phạm',
	'Vi phạm'
]

export const stringReportStatus = [
	'Chờ xử lý',
	'Không vi phạm',
	'Vi phạm'
]

export const stringReportStatusColor = [
	'warning',
	'success',
	'failure'
]