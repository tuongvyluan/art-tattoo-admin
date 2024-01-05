import queryString from 'query-string';
import * as crypto from 'crypto';
import { NEXT_PUBLIC_VNP_HASH_SECRET, NEXT_PUBLIC_VNP_TMN_CODE } from 'lib/env';
import { sortObject } from 'lib/vnpay';

const vnpayReturn = (req, res) => {
	let vnp_Params = req.query;

	let secureHash = vnp_Params['vnp_SecureHash'];

	delete vnp_Params['vnp_SecureHash'];
	delete vnp_Params['vnp_SecureHashType'];

	vnp_Params = sortObject(vnp_Params);

	let tmnCode = NEXT_PUBLIC_VNP_TMN_CODE;
	let secretKey = NEXT_PUBLIC_VNP_HASH_SECRET;

	let signData = queryString.stringify(vnp_Params, { encode: false });
	let hmac = crypto.createHmac('sha512', secretKey);
	let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

	console.log('secureHash', secureHash);
	console.log('signed', signed);
	console.log('res', res);
	if (secureHash === signed) {
		//Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

		res.redirect(
			`/package?code=${vnp_Params['vnp_ResponseCode']}`
		);
	} else {
		res.redirect('/package?code=97');
	}
};

export default vnpayReturn;
