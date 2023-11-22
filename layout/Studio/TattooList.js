import { formatDate } from 'lib';
import { stringPlacements } from 'lib/status';
import { usePaginate } from 'lib/usePagination';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, Loading, WidgetPostCard } from 'ui';

const TattooIndexPage = () => {
	const { items, error, isLoadingMore, size, setSize, isReachingEnd } = usePaginate(
		'/api/tattooArt',
		20
	);

	const [tattooCol, setTattooCol] = useState(2);

	const onResize = useCallback((event) => {
		const { innerWidth } = window;
		let cols = 2;
		if (innerWidth >= 640) {
			cols = 3;
		}
		if (innerWidth >= 1024) {
			cols = 5;
		}
		setTattooCol(cols);
	}, []);

	useEffect(() => {
		//add eventlistener to window
		onResize();
		window.addEventListener('resize', debounce(onResize, 100, true));
		// remove event on unmount to prevent a memory leak with the cleanup
		return () => {
			window.removeEventListener('resize', debounce(onResize, 100, true));
		};
	}, []);

	if (error)
		return (
			<div className="flex items-center justify-center h-full">
				Failed to load data
			</div>
		);
	if (!items)
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);

	return (
		<div className="lg:px-2">
			<InfiniteScroll
				dataLength={items.length}
				next={() => setSize(size + 1)}
				hasMore={isReachingEnd}
				loader={<Loading />}
				className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
			>
				{Array.from({ length: tattooCol }).map((col, colIndex) => (
					<div key={colIndex}>
						{items.map((item, index) => (
							<div key={index}>
								{index % tattooCol === colIndex && (
									<WidgetPostCard image={item.thumbnail} link={`/tattoo/${item.id}`}>
										<div>
											<Link href={`/artist/${item.artist.id}`}>
												<div className="cursor-pointer font-semibold">
													{item.artist.name}
												</div>
											</Link>
										</div>
										<Link href={`/tattoo/${item.id}`}>
											<div className="cursor-pointer">
												<div className="text-gray-400">
													Vị trí xăm:{' '}
													<span className="text-black">
														{stringPlacements.at(item.placement)}
													</span>
												</div>
												<div className="text-gray-400">
													Style:{' '}
													<span className="text-black">{item.style?.name}</span>
												</div>
											</div>
										</Link>
									</WidgetPostCard>
								)}
							</div>
						))}
					</div>
				))}
			</InfiniteScroll>
		</div>
	);
};

TattooIndexPage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar']
});

export default TattooIndexPage;
