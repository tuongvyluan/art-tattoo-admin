import PropTypes from 'prop-types';
import { Loading, WidgetPostCard } from 'ui';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useSession } from 'next-auth/react';
import { randomPhoto } from 'lib/tattooPhoto';
import MyInfiniteScroll from 'ui/MyInfiniteScroll';
import { CldUploadButton } from 'next-cloudinary';
import { BASE_URL, UPLOAD_PRESET } from 'lib/env';
import { fetcherPost } from 'lib';

const StudioInterior = ({ url, pageSize = 20, studioId }) => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);

	const { status } = useSession();

	const onSuccess = (result, options) => {
		fetcherPost(`${BASE_URL}/interior`, {
			studioId: studioId,
			url: result.info?.url
		}).then((data) => {
			const interiors = [...items];
			interiors.splice(0, 0, {
				url: result.info?.url
			});
		});
	};

	const endMessage = () => {
		if (items.length === 0) {
			return (
				<div className="absolute text-base w-full text-center -bottom-10 pb-3">
					Không tồn tại hình ảnh cho cơ sở vật chất nào
				</div>
			);
		}
		return (
			<div className="absolute text-base w-full text-center -bottom-7 pb-3">
				Đã tải hết hình ảnh
			</div>
		);
	};

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
					<div className="w-max pb-3">
						<CldUploadButton
							onSuccess={onSuccess}
							uploadPreset={UPLOAD_PRESET}
							className="text-gray-800 bg-white ring-1 ring-gray-300 hover:text-white hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
						>
							Thêm ảnh
						</CldUploadButton>
					</div>
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
							<div>
								{items.map((item, index) => (
									<div key={index}>
										<WidgetPostCard
											hasChildren={false}
											image={item.url ? item.url : randomPhoto}
										></WidgetPostCard>
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

StudioInterior.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar']
});

StudioInterior.propTypes = {
	url: PropTypes.string.isRequired,
	pageSize: PropTypes.number,
	studioId: PropTypes.string
};

export default StudioInterior;