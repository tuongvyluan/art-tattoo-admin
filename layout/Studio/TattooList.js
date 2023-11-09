import { formatDate } from 'lib';
import { stringPlacements } from 'lib/status';
import { usePaginate } from 'lib/usePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, Loading, WidgetPostCard } from 'ui';

const TattooIndexPage = () => {
	const { items, error, isLoadingMore, size, setSize, isReachingEnd } = usePaginate(
		'/api/tattooArt',
		20
	);

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
				{items.map((item) => (
					<WidgetPostCard
						key={item.id}
						title={item.artist.artistName}
						images={item.tattooMedias.map((media) => media.url)}
						imageHeight={200}
					>
						<Link href={`/tattoo/${item.id}`}>
							<div className='cursor-pointer'>
                <div className="text-gray-400">
                  Khách hàng:{' '}
                  <span className="text-black">{item.customer?.firstName}</span>
                </div>
                <div className="text-gray-400">
                  Ngày tạo:{' '}
                  <span className="text-black">
                    {formatDate(new Date(item.createdAt))}
                  </span>
                </div>
                <div className="text-gray-400">
                  Vị trí xăm:{' '}
                  <span className="text-black">
                    {stringPlacements.at(item.placement)}
                  </span>
                </div>
              </div>
						</Link>
					</WidgetPostCard>
				))}
			</InfiniteScroll>
		</div>
	);
};

TattooIndexPage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar']
});

export default TattooIndexPage;
