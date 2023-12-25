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
	['studio', 'Tiệm xăm']
]);

const getPageName = (key) => {
  return pageMap.get(key)
}

export default getPageName;