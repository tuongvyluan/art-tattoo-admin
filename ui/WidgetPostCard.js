import { Card } from './Card';

import { BackgroundImg } from './BackgroundImg';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/future/image';

export const WidgetPostCard = ({
	children,
	image,
	imageHeight,
	link = '#',
	hasChildren = true
}) => {
	return (
		<Card>
			<Link prefetch={false} href={link}>
				<div className="relative w-full cursor-pointer">
					{imageHeight ? (
						<BackgroundImg
							className="relative w-full bg-center bg-cover bg-fallback"
							image={image}
							height={imageHeight}
						/>
					) : (
						<Image
							className="relative w-full h-auto"
							src={image}
							width={0}
							height={0}
							sizes="100vw"
							alt="image"
						/>
					)}
				</div>
			</Link>
			{hasChildren && <div className={'p-2 bg-white'}>{children}</div>}{' '}
		</Card>
	);
};

WidgetPostCard.propTypes = {
	link: PropTypes.string,
	children: PropTypes.node.isRequired,
	image: PropTypes.string.isRequired,
	imageHeight: PropTypes.number,
	hasChildren: PropTypes.bool
};
