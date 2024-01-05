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

export const vnpayStatusCodeMap = new Map([
	['00', 'Giao dịch thành công.'],
	['05', 'Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.'],
	['06', 'Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin vui lòng thực hiện lại giao dịch.'],
	['09', 'Thẻ/Tài khoản của quý khách chưa đăng ký dịch vụ Internet Banking tại ngân hàng.'],
	['10', 'Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần.'],
	['11', 'Đã hết hạn chờ thanh toán. Xin vui lòng thực hiện lại giao dịch.'],
	['12', 'Thẻ/Tài khoản của quý khách bị khoá.'],
	['24', 'Quý khách huỷ giao dịch.'],
	['79', 'Quý khách nhập sai mật khẩu thanh toán quá số lần quy định. Xin vui lòng thực hiện lại giao dịch.'],
	['65', 'Tài khoản của quý khách đã vượt quá hạn mức giao dịch trong ngày.'],
	['75', 'Ngân hàng thanh toán đang bảo trì.'],
	['99', 'Lỗi không xác định (không có trong danh sách mã lỗi đã liệt kê).']
])

export const getCodeString = (code) => {
	const codeString = vnpayStatusCodeMap.get(code)
	return typeof codeString !== 'undefined' ? codeString : ''
}