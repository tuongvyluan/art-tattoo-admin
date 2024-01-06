import Heading from 'components/Heading';
import { Badge, Tooltip } from 'flowbite-react';
import { ChevronDown } from 'icons/outline';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import {
	filterReportStatus,
	stringReportStatus,
	stringReportStatusColor
} from 'lib/reportType';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { Alert, Card, CardBody, Dropdown, DropdownMenu, DropdownToggle } from 'ui';
import MyPagination from 'ui/MyPagination';

const AdminReport = () => {
	const router = useRouter();
	const [reports, setReports] = useState([]);
	const [page, setPage] = useState(router.query.page ? router.query.page : 1);
	const pageSize = 20;
	const [totalPage, setTotalPage] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [status, setStatus] = useState(
		router.query.status ? router.query.status : 0
	);

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

	useEffect(() => {
		setLoading(true);
		setError(false);

		fetcher(
			`${BASE_URL}/Media/GetAllReports?page=${page}&pageSize=${pageSize}&status=${status}`
		)
			.then((data) => {
				setReports(data.data);
				setTotalPage(Math.ceil(data.total / pageSize));
				setLoading(false);
			})
			.catch((e) => {
				setPage(1);
				setStatus(0);
				setReports([]);
				setTotalPage(0);
				setError(true);
				setLoading(false);
			})
			.finally(() => {
				router.push(`/report?page=${page}&status=${status}`);
			});
	}, [page, status]);
	return (
		<div className="relative min-h-body">
			<div className="sm:px-8 md:px-1 lg:px-6 xl:px-16">
				<Alert
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					color={alertContent.isWarn}
					className="bottom-2 right-2 absolute z-100"
				>
					<strong className="font-bold mr-1">{alertContent.title}</strong>
					<span className="block sm:inline">{alertContent.content}</span>
				</Alert>
				<Card>
					<CardBody>
						<div className="flex flex-wrap gap-2 justify-between pb-3 items-center">
							<Heading>Báo cáo</Heading>
							<div className="relative">
								<div className='font-semibold pb-1'>Trạng thái</div>
								<Dropdown className={'relative w-36'}>
									<DropdownToggle className={'relative'}>
										<div
											className={
												'appearance-none relative block w-full pl-1 pr-7 py-2.5 border border-gray-600 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-base leading-none'
											}
										>
											{filterReportStatus.at(status + 1)}
										</div>
										<div className="absolute top-2.5 right-2">
											<ChevronDown width={16} height={16} />
										</div>
									</DropdownToggle>
									<DropdownMenu className={'max-h-24 overflow-auto'}>
										<div>
											{filterReportStatus.map((f, fIndex) => (
												<div
													role="button"
													className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
														fIndex === status + 1 && 'bg-blue-50'
													}`}
													onClick={() => {
														if (fIndex !== status + 1) {
															setStatus(fIndex - 1);
														}
													}}
													key={f}
													value={fIndex - 1}
												>
													{filterReportStatus.at(fIndex)}
												</div>
											))}
										</div>
									</DropdownMenu>
								</Dropdown>
							</div>
						</div>

						{reports && reports.length > 0 && !error ? (
							<div className="h-full">
								<div className="w-full overflow-auto relative shadow-md sm:rounded-lg mb-5 text-base">
									{
										// Artist list
									}
									<table className="w-full min-w-3xl text-left text-gray-500">
										<thead>
											<tr>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Nội dung báo cáo
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Người báo cáo
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Người bị báo cáo
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Trạng thái
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50"></th>
											</tr>
										</thead>
										<tbody>
											{reports.map((r) => (
												<tr key={r.id}>
													<td className="px-3 py-4 w-1/3">
														{r.reportContent?.length > 50
															? r.reportContent?.slice(0, 50) + '...'
															: r.reportContent}
													</td>
													<td className="px-3 py-4">{r.reporterAccountName}</td>
													<td className="px-3 py-4">{r.reportedAccountName}</td>
													<td className="px-3 py-4">
														<div className="flex">
															<Badge color={stringReportStatusColor.at(r.status)}>
																{stringReportStatus.at(r.status)}
															</Badge>
														</div>
													</td>
													<td className="px-3 py-4">
														<Tooltip content="Xem chi tiết">
															<a className="text-gray-500">
																<HiMiniMagnifyingGlass
																	className="cursor-pointer font-bold"
																	size={20}
																/>
															</a>
														</Tooltip>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								{totalPage > 0 && (
									<MyPagination
										current={page}
										setCurrent={setPage}
										totalPage={totalPage}
									/>
								)}
							</div>
						) : (
							<div className="flex items-center justify-center h-20">
								{error ? (
									<div>Tải dữ liệu thất bại</div>
								) : (
									<div>Hiện chưa có báo cáo nào.</div>
								)}
							</div>
						)}
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default AdminReport;
