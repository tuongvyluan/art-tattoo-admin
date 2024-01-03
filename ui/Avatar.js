import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';

export const Avatar = ({
	src,
	alt = 'Avatar',
	size = 32,
	status,
	style,
	className,
	circular = true,
	...props
}) => {
	const [isBroken, setBroken] = useState(false);

	const circle = status && (
		<span
			className={`bg-${status}-500 status absolute right-0 top-0 rounded-full ring-white dark:ring-gray-700 ${
				size <= 32 ? 'ring-1' : 'ring-2'
			}`}
			style={{
				width: size / 5,
				height: size / 5,
				transform: 'translate(-30%, 30%)'
			}}
		></span>
	);

	const iconSize = size ? size + 'px' : '32px';

	return (
		<span
			{...props}
			className={classNames(
				`relative block ${circular ? 'rounded-full' : 'rounded-lg '}`,
				className
			)}
			style={{ ...style, width: iconSize, height: iconSize }}
		>
			{!isBroken ? (
				<CldImage
					quality="auto"
					format="auto"
					crop="thumb"
					width={200}
					height={200}
					src={src}
					alt={alt}
					className={`${circular ? 'rounded-full' : 'rounded-lg '}`}
					onError={() => setBroken(true)}
				/>
			) : (
				<span
					className={`flex items-center justify-center w-full h-full font-black bg-indigo-100 text-indigo-500 ${
						circular ? 'rounded-full' : 'rounded-lg '
					}`}
				>
					{alt.charAt(0)}
				</span>
			)}
			{status && circle}
		</span>
	);
};

Avatar.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	size: PropTypes.number.isRequired,
	status: PropTypes.oneOf([
		'gray',
		'red',
		'orange',
		'yellow',
		'green',
		'teal',
		'blue',
		'indigo',
		'purple',
		'pink'
	]),
	style: PropTypes.string,
	className: PropTypes.string,
	circular: PropTypes.bool
};
