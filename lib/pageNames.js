const pageMap = new Map([
	['booking', 'Đơn hàng'],
	['payment', 'Giao dịch'],
	['customer', 'Khách hàng'],
	['artist', 'Nghệ sĩ'],
	['payment', 'Giao dịch'],
	['tattoo', 'Hình xăm'],
	['interior', 'Nội thất'],
	['service', 'Bảng giá'],
  ['profile', 'Hồ sơ'],
	['studio', 'Tiệm xăm'],
	['myTattoo', 'Hình xăm của tôi'],
	['feedback', 'Đánh giá'],
	['meeting', 'Lịch hẹn'],
	['package', 'Gói dịch vụ']
]);

const getPageName = (key) => {
  return pageMap.get(key)
}

export default getPageName;