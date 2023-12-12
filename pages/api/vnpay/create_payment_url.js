// import { NEXT_PUBLIC_VNPAY_URL, NEXT_PUBLIC_VNP_HASH_SECRET, NEXT_PUBLIC_VNP_TMN_CODE } from 'lib/env';
// import qs from 'qs'
// import crypto from 'crypto'
// import moment from 'moment';
// import { sortObject } from 'lib/vnpay';

// // Tạo request thanh toán

// const handleCreatePaymentRequest = (req, res) => {
//     const packageId = req.body.packageId;
// 	if (req.method === 'POST') {
// 		process.env.TZ = 'Asia/Ho_Chi_Minh';

// 		let date = new Date();
// 		let createDate = moment(date).format('YYYYMMDDHHmmss');

//     let ipAddr = req.headers['x-forwarded-for'] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress;

//     let tmnCode = NEXT_PUBLIC_VNP_TMN_CODE
//     let secretKey = NEXT_PUBLIC_VNP_HASH_SECRET
//     let vnpUrl = NEXT_PUBLIC_VNPAY_URL
//     let returnUrl = '/vnpay/packageReturn'

//     let amount = req.body.amount;
//     let bankCode = req.body.bankCode;
    
//     let locale = req.body.language;
//     if(locale === null || locale === ''){
//         locale = 'vn';
//     }
//     let currCode = 'VND';
//     let vnp_Params = {};
//     vnp_Params['vnp_Version'] = '2.1.0';
//     vnp_Params['vnp_Command'] = 'pay';
//     vnp_Params['vnp_TmnCode'] = tmnCode;
//     vnp_Params['vnp_Locale'] = locale;
//     vnp_Params['vnp_CurrCode'] = currCode;
//     vnp_Params['vnp_TxnRef'] = packageId;
//     vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + packageId;
//     vnp_Params['vnp_OrderType'] = 'other';
//     vnp_Params['vnp_Amount'] = amount * 100;
//     vnp_Params['vnp_ReturnUrl'] = returnUrl;
//     vnp_Params['vnp_IpAddr'] = ipAddr;
//     vnp_Params['vnp_CreateDate'] = createDate;
//     if(bankCode !== null && bankCode !== ''){
//         vnp_Params['vnp_BankCode'] = bankCode;
//     }

//     vnp_Params = sortObject(vnp_Params);

//     let signData = qs.stringify(vnp_Params, { encode: false });
//     let hmac = crypto.createHmac("sha512", secretKey);
//     let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
//     vnp_Params['vnp_SecureHash'] = signed;
//     vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

//     res.redirect(vnpUrl)
// 	}
// };

// export default handleCreatePaymentRequest;

export default false;
