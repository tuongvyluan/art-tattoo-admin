import { randomFrom0To } from 'lib';
import {
	BOOKING_STATUS,
	SERVICE_SIZE,
	TATTOO_ART_STATUS,
	stringPlacements
} from 'lib/status';
import { tattooStylesWithoutDescription } from 'lib/tattooStyle';
import { v4 } from 'uuid';

const data = Array(20)
	.fill(0)
	.map((_, i) => {
		return {
			id: v4(),
			customer: {
				customerId: v4(),
				accountId: v4(),
				firstName: [
					'Vy',
					'Trân',
					'Trường',
					'Tân',
					'Thịnh',
					'Bảo',
					'Châu',
					'Dương',
					'Tuấn',
					'Đức'
				][randomFrom0To(10)],
				lastName: [
					'Nguyễn',
					'Luân',
					'Trần',
					'Lâm',
					'Vũ',
					'Lê',
					'Hoàng',
					'Đinh',
					'Lý',
					'Hồ'
				][randomFrom0To(3)],
				email: `email${[randomFrom0To(3)]}@gmail.com`,
				phoneNumber: '0912345678'
			},
			services: Array(1 + randomFrom0To(2))
				.fill(0)
				.map((_, i) => {
					return {
						serviceId: v4(),
						minPrice: 1000000 + randomFrom0To(9) * 100000,
						maxPrice: 2000000 + randomFrom0To(9) * 100000,
						hasColor: Math.random() < 0.5,
						isDifficult: Math.random() < 0.5,
						size: [
							SERVICE_SIZE.EXTRA,
							SERVICE_SIZE.LARGE,
							SERVICE_SIZE.MEDIUM,
							SERVICE_SIZE.SMALL
						][randomFrom0To(4)],
						ink: '',
						placement: randomFrom0To(stringPlacements.length)
					};
				}),
			artTattoos: Array(1 + randomFrom0To(2))
				.fill(0)
				.map((_, i) => {
					return {
						id: v4(),
						style: tattooStylesWithoutDescription[randomFrom0To(45)],
						artist: {
							accountId: v4(),
							firstName: [
								'Vy',
								'Trân',
								'Trường',
								'Tân',
								'Thịnh',
								'Bảo',
								'Châu',
								'Dương',
								'Tuấn',
								'Đức'
							][randomFrom0To(10)],
							lastName: [
								'Nguyễn',
								'Luân',
								'Trần',
								'Lâm',
								'Vũ',
								'Lê',
								'Hoàng',
								'Đinh',
								'Lý',
								'Hồ'
							][randomFrom0To(3)]
						},
						photo: [
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20180703_zY5TxVrqsm4PbQG.png?w=600',
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20180801_ZKP1ilwlCtpl80C.png?w=600',
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/postImage_TLBLorKh3M.png?w=600',
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20190812_8ImKSlW9XZOrogE.png?w=600',
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20190412_XlimSpuXS7GEu1V.jpg?w=600',
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20190630_aHDXzkZD0JdqIS3.png?w=600',
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/nodes_BXYJHjlECa.jpg?w=600',
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20180829_xD5mHwxVLhs21xo.png?w=600',
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20180823_iyIcQRE1cTbfn3Q.png?w=600',
							'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20190109_ieJmWAPACrUDE4v.jpg?w=600'
						][randomFrom0To(10)],
						size: [
							SERVICE_SIZE.EXTRA,
							SERVICE_SIZE.LARGE,
							SERVICE_SIZE.MEDIUM,
							SERVICE_SIZE.SMALL
						][randomFrom0To(4)],
						status: TATTOO_ART_STATUS.AVAILABLE,
						bookingDetails: [
							{
								bookingDetailsId: v4(),
								operationName: 'Xăm trọn gói',
								price: randomFrom0To(8) * 1200000 + 1000000
							}
						],
						placement: randomFrom0To(stringPlacements.length)
					};
				}),
			status: [
				BOOKING_STATUS.PENDING,
				BOOKING_STATUS.COMPLETED,
				BOOKING_STATUS.CANCELLED
			][randomFrom0To(3)],
			createdAt: new Date(),
			meetingDate: new Date(+new Date() + 200000000),
			total: randomFrom0To(8) * 1200000 + 1000000
		};
	});
const getBookingList = (req, res) => {

	if (req.query.id) {
		return res.json(data.at(0))
	}
	return res.json(data)
};
export default getBookingList;
