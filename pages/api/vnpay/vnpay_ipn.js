// import { NEXT_PUBLIC_VNP_HASH_SECRET } from 'lib/env';
// import { sortObject } from 'lib/vnpay';
// import crypto from 'crypto';
// import qs from 'qs';

// // Nhận kết quả phản hồi từ Cổng thanh toán VNPAY

// const getVnpayIpn = (req, res) => {
// 	let vnp_Params = req.query;
// 	let secureHash = vnp_Params['vnp_SecureHash'];

// 	let packageId = vnp_Params['vnp_TxnRef'];
// 	let rspCode = vnp_Params['vnp_ResponseCode'];

// 	delete vnp_Params['vnp_SecureHash'];
// 	delete vnp_Params['vnp_SecureHashType'];

// 	vnp_Params = sortObject(vnp_Params);

// 	let secretKey = NEXT_PUBLIC_VNP_HASH_SECRET;
// 	let signData = qs.stringify(vnp_Params, { encode: false });
// 	let hmac = crypto.createHmac('sha512', secretKey);
// 	let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

// 	let paymentStatus = 0; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
// 	//let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
// 	//let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

// 	let checkPackageId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
// 	let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
// 	if (secureHash === signed) {
// 		//kiểm tra checksum
// 		if (checkPackageId) {
// 			if (checkAmount) {
// 				if (paymentStatus == 0) {
// 					//kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
// 					if (rspCode == '00') {
// 						//thanh cong
// 						paymentStatus = 1
// 						// Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
// 						res.status(200).json({ RspCode: '00', Message: 'Success' });
// 					} else {
// 						//that bai
// 						paymentStatus = 2
// 						// Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
// 						res.status(200).json({ RspCode: '00', Message: 'Success' });
// 					}
// 				} else {
// 					res
// 						.status(200)
// 						.json({
// 							RspCode: '02',
// 							Message: 'This order has been updated to the payment status'
// 						});
// 				}
// 			} else {
// 				res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
// 			}
// 		} else {
// 			res.status(200).json({ RspCode: '01', Message: 'Package not found' });
// 		}
// 	} else {
// 		res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
// 	}
// };

// export default getVnpayIpn;

export default false;
