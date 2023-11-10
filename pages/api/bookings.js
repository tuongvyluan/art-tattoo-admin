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
							'https://res.cloudinary.com/didbpuxlt/image/upload/v1699618040/fg3okai6ykckrt3ayhnb.webp',
							'https://res.cloudinary.com/didbpuxlt/image/upload/v1699618040/jsmevnjedqggvb7ug4ly.webp',
							'http://res.cloudinary.com/didbpuxlt/image/upload/v1699618040/tmthhhbasigujjqxenl1.webp',
							'http://res.cloudinary.com/didbpuxlt/image/upload/v1699618040/olc0mzjoybrf1odeynnu.webp',
							'http://res.cloudinary.com/didbpuxlt/image/upload/v1699618040/v10zlbwlh43gfbsu7ksy.webp',
							'http://res.cloudinary.com/didbpuxlt/image/upload/v1699618040/tefad0rzugdnekvxd14f.webp',
							'http://res.cloudinary.com/didbpuxlt/image/upload/v1699618040/bucnozik8rmqepiw2gky.webp',
							'http://res.cloudinary.com/didbpuxlt/image/upload/v1699618041/ilgkjxvfhahlfjwckp1i.webp',
							'http://res.cloudinary.com/didbpuxlt/image/upload/v1699618041/iwiyxibenpxfubc5gb54.webp',
							'http://res.cloudinary.com/didbpuxlt/image/upload/v1699618041/lurefci1dfzvrrahx4sy.webp'
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
