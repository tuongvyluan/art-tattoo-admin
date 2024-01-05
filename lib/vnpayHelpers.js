export const vnpayMethodList = () => {
	return [
		'',
		'VNPAYQR',
		'VNBANK',
		'INTCARD'
	];
};

export const methodMap = new Map([
	['', 'Cổng thanh toán VNPAYQR'],
	['VNPAYQR', 'Thanh toán qua ứng dụng hỗ trợ VNPAYQR'],
	['VNBANK', 'Thanh toán qua ATM - Tài khoản ngân hàng nội địa'],
	['INTCARD', 'Thanh toán qua thẻ quốc tế']
]);
