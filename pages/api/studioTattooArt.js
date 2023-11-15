import { randomFrom0To } from 'lib';
import { stringPlacements, stringSize } from 'lib/status';
import { countStyle } from 'lib/tattooStyle';
import { v4 } from 'uuid';

const data = {
	id: [
		'4e52b109-e267-4aeb-9763-090fc60b21f1',
		'f73d647a-34e1-4cdf-88a5-3968d49bd577',
		'009f1723-6fdc-4ef9-b8c7-5569d0d3f29e',
		'0b8d9754-a833-467a-862a-7459fe6d8171',
		'ae439cd0-72e3-4215-9ae9-8464bc23c09b'
	][randomFrom0To(5)],
	bookingId: v4(),
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
	description: [
		'Mô tả 1',
		'Mô tả 2',
		'Mô tả 3',
		'Mô tả 4',
		'Mô tả 5',
		'Mô tả 6',
		'Mô tả 7',
		'Mô tả 8'
	][Math.floor(Math.random() * 8)],
	size: randomFrom0To(stringSize.length),
	placement: randomFrom0To(stringPlacements.length),
	artist: {
		artistId: Math.floor(Math.random() * 900),
		firstName: [
			'Megan',
			'Jeffrey',
			'Amber',
			'Megan',
			'Melissa',
			'Danielle',
			'Roy',
			'Samantha'
		][Math.floor(Math.random() * 8)]
	},
	styleId: randomFrom0To(countStyle),
	images: [
		{
			imageId: [Math.floor(Math.random() * 50)],
			imageName: [
				'Trắng đen',
				'Màu sắc',
				'Neon',
				'Dải màu (Gradient)',
				'Chữ',
				'Bộ xương',
				'Đầu lâu',
				'Anime',
				'Hoa lá',
				'Cây xương rồng',
				'Hoa hồng',
				'Cây đào',
				'Tre trúc',
				'Động vật',
				'Bướm',
				'Rồng',
				'Phượng',
				'Chim',
				'Rắn',
				'Mèo',
				'Chó',
				'Tàu ngầm',
				'Mỏ neo',
				'Sóng',
				'Núi',
				'Mặt trời',
				'Mặt trăng',
				'Ngôi sao',
				'Mưa',
				'Trái tim',
				'Hình học',
				'Đồng hồ',
				'Hoa văn',
				'Chân dung',
				'Mặt quỷ',
				'Con mắt',
				'Đường chân trời'
			][Math.floor(Math.random() * 3)]
		}
	],
	stages: Array(2)
		.fill(0)
		.map((_, i) => {
			return {
				id: v4() + `${i}`,
				name: [
					'Trước khi xăm',
					'Thiết kế',
					'Scan trên da',
					'Đi nét viền',
					'Đánh bóng',
					'Tô màu',
					'Sau khi xăm',
					'Trước khi xoá',
					'Sau khi xoá xăm'
				][Math.floor(Math.random() * 8)],
				medias: [
					{
						tattooMediaId: Math.floor(Math.random() * 1000),
						url: [
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
						isPublicized: Math.random() > 0.5
					},
					{
						tattooMediaId: Math.floor(Math.random() * 1000),
						url: [
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
						isPublicized: Math.random() > 0.5
					}
				]
			};
		}),
	bookingDetails: [
		{
			bookingDetailsId: v4(),
			operationName: 'Xăm trọn gói',
			price: randomFrom0To(8) * 1200000 + 1000000
		}
	],
	createdAt: new Date(),
	isPublicized: Math.random() < 0.5
};

const getStudioTattooArts = (req, res) => res.json(data);

export default getStudioTattooArts;
