const data = [
	{
		id: 1,
		name: 'Xăm 3D',
		description:
			'Tạo ra hiệu ứng chiều sâu và thể hiện sự tridimensional trong các hình vẽ'
	},
	{
		id: 2,
		name: 'Trừu tượng',
		description:
			'Sử dụng hình ảnh trừu tượng hoặc không rõ ràng để tạo nên các tác phẩm độc đáo.'
	},
	{
		id: 3,
		name: 'Phát sáng (UV ink)',
		description:
			'Sử dụng mực phát sáng trong ánh sáng tím để tạo ra hiệu ứng sáng trong bóng tối'
	},
	{
		id: 4,
		name: 'Dải màu (Gradient)',
		description:
			'Sử dụng dải màu chuyển tiếp để tạo ra một sự mượt mà và thú vị trong hình xăm'
	},
	{
		id: 5,
		name: 'Graffiti',
		description:
			'Lấy cảm hứng từ nghệ thuật đường phố và graffiti, tạo ra các tác phẩm đậm chất cá nhân'
	},
	{
		id: 6,
		name: 'Tả thực (Hyper realistic)',
		description: 'Tạo ra các hình xăm cực kỳ chân thực, giống như một bức tranh'
	},
	{
		id: 7,
		name: 'Đảo nghịch màu (Inverted)',
		description: 'Sử dụng hiệu ứng đảo màu để tạo ra hình xăm nghịch ngợm và thú vị'
	},
	{
		id: 8,
		name: 'Chữ đa chiều (Ambigram)',
		description:
			'Tạo ra các chữ viết hoặc từ có thể đọc được từ nhiều góc độ khác nhau'
	},
	{
		id: 9,
		name: 'Chữ viết (Lettering)',
		description: 'Tạo ra các hình xăm dựa trên các chữ cái hoặc chữ viết độc đáo'
	},
	{
		id: 10,
		name: 'Đường kẻ (Line)',
		description:
			' Sử dụng các đường nét và đường kẻ để tạo nên các mẫu hình và hình xăm'
	},
	{
		id: 11,
		name: 'Phong cách Ý (Mambo)',
		description: 'Chú trọng vào các mẫu hoa văn và hình ảnh phong cách Ý'
	},
	{
		id: 12,
		name: 'Hoa văn (Mandala)',
		description:
			'Sử dụng các hình hoa văn và mẫu hình hình tròn để tạo ra các hình xăm phức tạp và đẹp mắt'
	},
	{
		id: 13,
		name: 'Mayan',
		description:
			'Lấy cảm hứng từ văn hóa và hình ảnh Mayan cổ đại để tạo ra các hình xăm độc đáo'
	},
	{
		id: 14,
		name: 'Tối giản (Minimalist)',
		description:
			'Tạo ra các hình xăm đơn giản và tối giản, thường chỉ sử dụng một vài yếu tố cơ bản'
	},
	{
		id: 15,
		name: 'Chân dung (Portrait)',
		description:
			'Tạo ra các hình xăm tái tạo chân dung con người hoặc người nổi tiếng'
	},
	{
		id: 16,
		name: 'Trích dẫn (Quote/Word)',
		description: 'Sử dụng từ hoặc câu trích dẫn yêu thích làm nội dung cho hình xăm'
	},
	{
		id: 17,
		name: 'Negative Space',
		description:
			'Sử dụng không gian trống để tạo ra các hình xăm sáng tạo và độc đáo'
	},
	{
		id: 18,
		name: 'Cổ điển Mỹ (Neo-Traditional)',
		description:
			'Kết hợp giữa phong cách truyền thống và phong cách đương đại để tạo ra các hình xăm sáng tạo'
	},
	{
		id: 19,
		name: 'Old-school',
		description: 'Hình xăm theo lối truyền thống'
	},
	{
		id: 20,
		name: 'New school',
		description: 'Phát triển từ old-school, sáng tạo đa dạng'
	},
	{
		id: 21,
		name: 'Ảo giác  (Optical Illusion)',
		description:
			'Sử dụng hiệu ứng quang học để tạo ra các hình xăm độc đáo và gây thích thú'
	},
	{
		id: 22,
		name: 'Đường viền (Outline)',
		description: 'Tạo ra các hình xăm với đường nét rõ ràng và đặc trưng'
	},
	{
		id: 23,
		name: 'Sọc (Pinstripe)',
		description: ' Sử dụng các sọc và đường kẻ để tạo ra các mẫu hình hấp dẫn'
	},
	{
		id: 24,
		name: 'Bể hình (Pixel)',
		description:
			'Sử dụng các điểm ảnh để tạo ra các hình xăm giống như hình ảnh kỹ thuật số'
	},
	{
		id: 25,
		name: 'Đốm nhỏ (Pointilism)',
		description: 'Sử dụng các chấm nhỏ để tạo nên các hình xăm sáng tạo và chi tiết'
	},
	{
		id: 26,
		name: 'Đại chúng (Pop Art)',
		description:
			'Lấy cảm hứng từ nghệ thuật pop art, tạo ra các hình xăm sặc sỡ và vui nhộn'
	},
	{
		id: 27,
		name: 'Giải phẫu (Anatomical)',
		description: 'Tạo ra các hình xăm liên quan đến cấu trúc cơ thể và giải phẫu'
	},
	{
		id: 28,
		name: 'Cơ học (Biomechanical)',
		description:
			'Kết hợp giữa yếu tố cơ học và sinh học để tạo ra các hình xăm hiện đại'
	},
	{
		id: 29,
		name: 'Đen và xám (Black and Grey)',
		description: 'Sử dụng màu đen và xám để tạo ra các hình xăm tinh tế và chi tiết'
	},
	{
		id: 30,
		name: 'Đen (Blackwork / Blackout)',
		description:
			'Tạo ra các hình xăm hoàn toàn màu đen, thường tạo ra hiệu ứng độc đáo'
	},
	{
		id: 31,
		name: 'Blast over',
		description:
			' Sử dụng các màu sáng để tạo ra các hình xăm bắt mắt, thường được đè lên các hình xăm cũ'
	},
	{
		id: 32,
		name: 'Bóng đen (Silhouette)',
		description:
			'Tạo ra các hình xăm dựa trên hình dáng và đường viền, thường chỉ sử dụng màu đen'
	},
	{
		id: 33,
		name: 'Ký hoạ (Sketch)',
		description:
			'Tạo ra các hình xăm giống như bức vẽ nhanh bằng bút chì hoặc bút mực'
	},
	{
		id: 34,
		name: 'Bắc Âu, Viking',
		description:
			'Lấy cảm hứng từ văn hóa Viking để tạo ra các hình xăm liên quan đến các yếu tố Bắc Âu'
	},
	{
		id: 35,
		name: 'Vết cọ vẽ (Paint brush stroke)',
		description:
			'Lấy cảm hứng từ văn hóa Viking để tạo ra các hình xăm liên quan đến các yếu tố Bắc Âu'
	},
	{
		id: 36,
		name: 'Điểm chấm (Dotwork)',
		description: 'Sử dụng các điểm chấm để tạo ra các hình xăm chi tiết và phức tạp'
	},
	{
		id: 37,
		name: 'Hình học (Geometric)',
		description: 'Tạo ra các hình xăm dựa trên các hình học và mẫu hình đặc trưng'
	},
	{
		id: 38,
		name: 'Nhiễu sóng (Glitch)',
		description:
			'Sử dụng hiệu ứng glitch và kỹ thuật số để tạo ra các hình xăm độc đáo'
	},
	{
		id: 39,
		name: 'Chicano',
		description:
			'Tạo ra các hình xăm có nguồn gốc từ văn hóa Chicano, thường bao gồm hình vẽ liên quan đến người Mỹ gốc Mexico'
	},
	{
		id: 40,
		name: 'Kính vỡ (Broken Glass)',
		description:
			' Sử dụng hình ảnh kính vỡ để tạo ra các hình xăm độc đáo và thú vị.'
	},
	{
		id: 41,
		name: 'Kính màu',
		description:
			'Sử dụng màu sắc và kỹ thuật liên quan đến kính màu để tạo ra các hình xăm sống động'
	},
	{
		id: 42,
		name: 'Thổ dân (Tribal / Polynesian / Maori / Hawaiian)',
		description:
			'Lấy cảm hứng từ văn hóa thổ dân và bản địa để tạo ra các hình xăm truyền thống'
	},
	{
		id: 43,
		name: 'Màu nước (Watercolor)',
		description:
			'Sử dụng màu sắc nước và kỹ thuật sáng tạo để tạo ra các hình xăm màu nước'
	},
	{
		id: 44,
		name: 'Mực trắng (White Ink)',
		description: 'Sử dụng mực màu trắng để tạo ra các hình xăm màu trắng và tinh tế'
	},
	{
		id: 45,
		name: 'Chạm khắc gỗ (Wood Carving)',
		description: 'Tạo ra các hình xăm dựa trên hình ảnh chạm khắc gỗ truyền thống.'
	}
];

export const tattooStyles = data;
export const tattooStylesWithoutDescription = data.map((tattoo) => {
	return {
		id: tattoo.id,
		name: tattoo.name
	};
});
export const tattooStyleById = (id) => {
	const found = data.filter((s) => s.id === id);
	return data.filter((s) => s.id === id).length === 1 ? found.at(0) : null;
};
