import Button from 'components/Button';
import Heading from 'components/Heading';
import MyModal from 'components/MyModal';
import { fetcher, fetcherPut } from 'lib';
import { BASE_URL } from 'lib/env';
import { REPORT_STATUS } from 'lib/status';
import PropTypes from 'propTypes';
import { useEffect, useState } from 'react';
import { Loading } from 'ui';
import { TattooArtCarousel } from 'ui/TattooArtCarousel';

const ReportDetailModal = ({
	report,
	openReport,
	setOpenReport,
	fetchData,
	handleAlert
}) => {
	const [tattooArt, setTattooArt] = useState(undefined);
	const [error, setError] = useState(false);

	const fetchTattooArt = (id) => {
		fetcher(`${BASE_URL}/TattooArts/GetTattooArtMediaById?id=${id}&isAll=false`)
			.then((data) => {
				setTattooArt(data);
			})
			.catch(() => {
				setError(true);
			});
	};

	const handleReport = (report, status) => {
		handleAlert(true, 'Đang giải quyết báo cáo');
		fetcherPut(`${BASE_URL}/Media/UpdateReport`, {
			id: report.id,
			status: status
		})
			.then(() => {
				fetchData();
				handleAlert(true, 'Giải quyết báo cáo thành công.', '', 1);
			})
			.catch(() => {
				handleAlert(true, 'Giải quyết báo cáo thất bại.', '', 2);
			})
			.finally(() => {
				setOpenReport(false);
			});
	};

	useEffect(() => {
		if (report && report.commentId === null) {
			if (tattooArt?.id !== report.tattooArtId) {
				fetchTattooArt(report.tattooArtId);
			}
		}
	}, [report]);

	useEffect(() => {
		if (!openReport) {
			setError(false);
		}
	}, [openReport]);

	return (
		<div className="relative">
			<MyModal
				size={tattooArt && report?.commentId === null ? '5xl' : 'lg'}
				noFooter={true}
				openModal={openReport}
				setOpenModal={setOpenReport}
				title={'Xác nhận nội dung vi phạm'}
			>
				<div>
					<div className="max-h-96 w-full min-w-0 overflow-auto relative">
						{
							// Check whether reported content is a comment or a tattoo art
							report?.commentId ? (
								<div>
									<div className="pb-3">
										<Heading>Thông tin bị báo cáo:</Heading>
										<div>
											<span className="inline-block w-32">Người đăng:</span>
											{report?.reportedAccountName}
										</div>
										<div className="flex overflow-hidden w-full">
											<div className="break-words overflow-hidden">
												<span className="inline-block w-32">Nội dung:</span>
												{report?.commentContent}
											</div>
										</div>
									</div>
									<div>
										<Heading>Thông tin báo cáo:</Heading>
										<div>
											<span className="inline-block w-32">Người báo cáo:</span>
											{report?.reporterAccountName}
										</div>
										<div className="flex overflow-hidden w-full">
											<div className="break-words overflow-hidden">
												<span className="inline-block w-32">Nội dung:</span>
												{report?.reportContent}
											</div>
										</div>
									</div>
								</div>
							) : (
								<div>
									{tattooArt ? (
										<div>
											<div className="pb-3">
												<Heading>Hình xăm bị báo cáo:</Heading>
												<div className="w-full max-w-max mx-auto">
													<div>
														<TattooArtCarousel
															imageHeight={600}
															images={[tattooArt?.thumbnail].concat(
																tattooArt?.tattooImages.map((i) => i.url)
															)}
														/>
													</div>
												</div>
											</div>
											<div>
												<Heading>Nội dung báo cáo:</Heading>
												<div>{report?.reportContent}</div>
											</div>
										</div>
									) : (
										!error && (
											<div className="flex items-center justify-center h-full">
												<Loading />
											</div>
										)
									)}
								</div>
							)
						}
					</div>
					<div className="flex flex-wrap gap-5 justify-center border-t border-gray-300 pt-5 mt-5">
						<div className="w-28">
							<Button outline onClick={() => setOpenReport(false)}>
								Đóng
							</Button>
						</div>
						<div className="w-28">
							<Button warn onClick={() => handleReport(report, REPORT_STATUS.VALID)}>
								Vi phạm
							</Button>
						</div>
						<div className="w-28">
							<Button onClick={() => handleReport(report, REPORT_STATUS.INVALID)}>
								Không vi phạm
							</Button>
						</div>
					</div>
				</div>
			</MyModal>
		</div>
	);
};

ReportDetailModal.propTypes = {
	report: PropTypes.object,
	openReport: PropTypes.bool,
	setOpenReport: PropTypes.func,
	fetchData: PropTypes.func,
	handleAlert: PropTypes.func
};

export default ReportDetailModal;
