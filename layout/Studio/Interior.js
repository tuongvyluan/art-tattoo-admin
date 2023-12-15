import PropTypes from 'prop-types';
import { Alert, Loading, WidgetPostCard } from 'ui';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { randomPhoto } from 'lib/tattooPhoto';
import MyInfiniteScroll from 'ui/MyInfiniteScroll';
import { CldUploadButton } from 'next-cloudinary';
import { BASE_URL, UPLOAD_PRESET } from 'lib/env';
import { fetcherDelete, fetcherPost } from 'lib';
import { BsX } from 'react-icons/bs';
import MyModal from 'components/MyModal';

const StudioInterior = ({ url, pageSize = 20, studioId }) => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [openRemoveModal, setOpenRemoveModal] = useState(false);
	const [removedInteriorIndex, setRemovedInteriorIndex] = useState(-1);

	const { status } = useSession();

	const handleRemoveInterior = () => {
		setOpenRemoveModal(false);
		if (removedInteriorIndex >= 0) {
			handleAlert(true, '', 'Đang xoá ảnh...');
			const interiorId = items.at(removedInteriorIndex)?.id;
			fetcherDelete(`${BASE_URL}/interior?id=${interiorId}`)
				.then(() => {
					const interiors = [...items];
					interiors.splice(removedInteriorIndex, 1);
					setItems(interiors);
					handleAlert(true, 'Xoá ảnh thành công.', '', 1);
				})
				.catch(() => {
					handleAlert(true, 'Xoá ảnh thất bại.', '', 2);
				});
		}
	};

	const onSuccess = (result, options) => {
		fetcherPost(`${BASE_URL}/interior`, {
			studioId: studioId,
			url: result.info?.url
		}).then((data) => {
			const interiors = [...items];
			interiors.splice(0, 0, {
				id: data.id,
				url: result.info?.url
			});
			setItems(interiors);
		});
	};

	// Alert related vars
	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: 'blue'
	});

	const handleAlert = (state, title, content, isWarn = 0) => {
		setShowAlert((prev) => state);
		let color;
		switch (isWarn) {
			case 1:
				color = 'green';
				break;
			case 2:
				color = 'red';
				break;
			default:
				color = 'blue';
				break;
		}
		setAlertContent({
			title: title,
			content: content,
			isWarn: color
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
		return <div></div>;
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
			<Alert
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				color={alertContent.isWarn}
				className="bottom-2 right-2 fixed max-w-md z-50"
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
			<MyModal
				title="Xác nhận xoá ảnh nội thất"
				warn={true}
				openModal={openRemoveModal}
				setOpenModal={setOpenRemoveModal}
				onSubmit={handleRemoveInterior}
			>
				<div>Bạn có chắc muốn xoá ảnh nội thất này chứ?</div>
			</MyModal>
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
						<div className="grid grid-cols-2 gap-3">
							{items.map((item, index) => (
								<div className="relative" key={item.id}>
									<div className="flex w-full justify-end">
										<div className="cursor-pointer">
											<BsX
												size={25}
												onClick={() => {
													setRemovedInteriorIndex(index);
													setOpenRemoveModal(true);
												}}
											/>
										</div>
									</div>
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
