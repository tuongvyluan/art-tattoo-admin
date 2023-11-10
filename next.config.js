module.exports = {
	webpack: (config) => {
		config.module.rules.push(
			{
				test: /\.md$/,
				use: 'raw-loader'
			},
			{
				test: /\.svg$/,
				use: {
					loader: '@svgr/webpack',
					options: {
						svgoConfig: {
							plugins: [
								{
									name: 'removeViewBox',
									active: false
								}
							]
						}
					}
				}
			},
		);

		return config;
	},
	images: {
		domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      }
    ]
  },
};
