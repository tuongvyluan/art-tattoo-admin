import { Carousel, CarouselIndicators, CarouselSlide } from './Carousel';

import { BackgroundImg } from './BackgroundImg';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { optimizeImage } from 'lib';
import { CldImage, CldOgImage } from 'next-cloudinary';
import Image from 'next/future/image';
import { height } from 'tailwindcss/defaultTheme';

export const TattooArtCarousel = ({ images, imageHeight }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);

	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};

	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};

	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	};

	return (
		<div className="relative min-w-max break-words rounded-lg overflow-hidden shadow-sm w-full bg-white dark:bg-gray-600">
			<div className="relative w-full">
				<Carousel
					next={next}
					previous={previous}
					className="rounded-t-lg overflow-hidden"
					style={{
						height: imageHeight
					}}
				>
					{images.map((image, index) => (
						<CarouselSlide key={index} index={index} activeIndex={activeIndex}>
							<div style={{height: imageHeight}} className='bg-black flex flex-col justify-center'>
								<Image
									className="relative w-max h-auto mx-auto"
									src={image}
									width={0}
									sizes="100vw"
									height={imageHeight}
									priority
									alt="image"
								/>
							</div>
						</CarouselSlide>
					))}
					<CarouselIndicators
						items={images}
						activeIndex={activeIndex}
						onClickHandler={goToIndex}
					/>
				</Carousel>
			</div>
		</div>
	);
};

TattooArtCarousel.propTypes = {
	images: PropTypes.array.isRequired,
	imageHeight: PropTypes.number.isRequired
};
