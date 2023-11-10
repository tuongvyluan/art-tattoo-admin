import { randomFrom0To } from 'lib';
import { stringPlacements, stringSize } from 'lib/status';
import { v4 } from 'uuid';

const data = Array(15)
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
			size: stringSize.at(randomFrom0To(stringSize.length)),
			position: stringPlacements.at(randomFrom0To(stringPlacements.length)),
			artist: {
				artistId: [Math.floor(Math.random() * 900)],
				artistName: [
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
			style: tattooStylesWithoutDescription[randomFrom0To(45)],
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
			tattooMedias: [
				{
					tattooMediaId: Math.floor(Math.random() * 1000),
					tattooArtStage: null,
					type: 0, //0: image, 1: video
					url: [
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
					description: 'Mô tả media 1'
				},
				{
					tattooMediaId: Math.floor(Math.random() * 1000),
					tattooArtStage: [
						'Xoá xăm',
						'Trước khi xăm',
						'Thiết kế',
						'Scan trên da',
						'Đi nét viền',
						'Đánh bóng',
						'Tô màu',
						'Sau xăm'
					][Math.floor(Math.random() * 8)],
					type: 0, //0: image, 1: video
					url: [
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
					description: 'Mô tả media 1'
				},
				{
					tattooMediaId: Math.floor(Math.random() * 1000),
					tattooArtStage: [
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
					type: 0, //0: image, 1: video
					url: [
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
					description: 'Mô tả media 1'
				}
			],
			bookingDetails: [
				{
					bookingDetailsId: v4(),
					operationName: 'Xăm trọn gói',
					price: randomFrom0To(8) * 1200000 + 1000000
				}
			],
			placement: randomFrom0To(stringPlacements.length),
			createdAt: new Date(),
		};
	});

const getTattooArts = (req, res) => res.json(data);

export default getTattooArts;
