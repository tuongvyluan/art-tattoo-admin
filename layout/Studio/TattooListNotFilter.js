import { IoMdHeartEmpty } from 'react-icons/io';
import PropTypes from 'prop-types';
import { Avatar, Link, Loading, WidgetPostCard } from 'ui';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useSession } from 'next-auth/react';
import { noImageAvailable } from 'lib/tattooPhoto';
import MyInfiniteScroll from 'ui/MyInfiniteScroll';
import { stringPlacements, stringSize } from 'lib/status';
import { tattooStyleById } from 'lib/tattooStyle';

const TattooListNotFilter = ({ url, pageSize = 20 }) => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);

	const { status } = useSession();
	const [tattooCol, setTattooCol] = useState(2);

	const onResize = useCallback((event) => {
		const { innerWidth } = window;
		let cols = 2;
		if (innerWidth >= 640) {
			cols = 3;
		}
		if (innerWidth >= 768) {
			cols = 4;
		}
		if (innerWidth >= 1024) {
			cols = 5;
		}
		if (innerWidth >= 1280) {
			cols = 6;
		}
		setTattooCol(cols);
	}, []);

	const endMessage = () => {
		if (items.length === 0) {
			return (
				<div className="absolute text-base w-full text-center -bottom-7 pb-3">
					Không tồn tại hình xăm nào
				</div>
			);
		}
		return <div></div>;
	};

	useEffect(() => {
		//add eventlistener to window
		onResize();
		window.addEventListener('resize', debounce(onResize, 100, true));
		// remove event on unmount to prevent a memory leak with the cleanup
		return () => {
			window.removeEventListener('resize', debounce(onResize, 100, true));
		};
	}, []);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	return (
		<div className="relative lg:mx-6">
			<div>
				<div>
					<div>
						<MyInfiniteScroll
							parentPage={page}
							setParentPage={setPage}
							parentItems={items}
							setParentItems={setItems}
							pageSize={pageSize}
							url={url}
							endMessage={endMessage()}
							loader={
								<div className="absolute w-full flex justify-center -bottom-12 pb-3">
									<Loading />
								</div>
							}
						>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
								{Array.from({ length: tattooCol }).map((col, colIndex) => (
									<div key={colIndex}>
										{items.map((item, index) => (
											<div key={index}>
												{index % tattooCol === colIndex && (
													<WidgetPostCard
														image={item.thumbnail ? item.thumbnail : noImageAvailable}
														link={`/tattoo/${item.id}?booking=${item.bookingId}&back=tattoo`}
													>
														<div className="block cursor-pointer">
															<div className="flex items-start gap-1">
																<div className="flex gap-1 items-center">
																	<div>
																		<IoMdHeartEmpty
																			className="hover:text-gray-600 font-semibold cursor-pointer"
																			size={20}
																		/>
																	</div>
																	<div className="flex gap-1 items-end text-gray-700">
																		<div className="text-left text-xs font-semibold w-14">
																			{item.likeCount} thích
																		</div>
																	</div>
																</div>
															</div>
															<Link prefetch={false} href={`/artist/${item.artistId}`}>
																<div className="cursor-pointer font-semibold pt-2">
																	<div className="flex gap-2">
																		<Avatar
																			src={
																				item.avatar ? item.avatar : '/images/ATL.png'
																			}
																			size={20}
																		/>
																		<div>{item.fullName}</div>
																	</div>
																</div>
															</Link>
															<Link prefetch={false} href={`/tattoo/${item.id}?booking=${item.bookingId}&back=tattoo`}>
																<div className="cursor-pointer pt-1">
																	<div className="text-gray-400">
																		Vị trí xăm:{' '}
																		<span className="text-black">
																			{stringPlacements.at(item.placement)}
																		</span>
																	</div>
																	<div className="text-gray-400">
																		Kích thước:{' '}
																		<span className="text-black">
																			{stringSize.at(item.size)}
																		</span>
																	</div>
																	<div className="text-gray-400">
																		Style:{' '}
																		<span className="text-black">
																			{tattooStyleById(item.styleId)?.name}
																		</span>
																	</div>
																</div>
															</Link>
														</div>
													</WidgetPostCard>
												)}
											</div>
										))}
									</div>
								))}
							</div>
						</MyInfiniteScroll>
					</div>
				</div>
			</div>
		</div>
	);
};

TattooListNotFilter.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar']
});

TattooListNotFilter.propTypes = {
	url: PropTypes.string.isRequired,
	pageSize: PropTypes.number
};

export default TattooListNotFilter;
