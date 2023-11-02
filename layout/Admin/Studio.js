import { Table } from 'components/Table';
import React from 'react';
import { Loading } from 'ui';
import { fetcher, fetcherPutWithToken } from 'lib';
import useSWR from 'swr';
import { Title } from 'ui/Title';
import TableCellType from 'lib/tableCellType';

function AdminStudioPage() {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Studio',
				columns: [
					{
						Header: 'Name',
						accessor: 'owner.fullName'
					},
					{
						Header: 'Address',
						accessor: 'address'
					},
					{
						Header: 'Rating',
						accessor: 'owner.rating'
					}
				]
			},
			{
				Header: 'Status',
				columns: [
					{
						Header: 'Active',
						accessor: 'activeStatus'
					},
					{
						Header: 'Approved',
						accessor: 'approveStatus'
					}
				]
			}
		],
		[]
	);

	const baseUrl = `${process.env.NEXT_PUBLIC_API_BASEURL}/Studios`;

	let { data, error } = useSWR(baseUrl, fetcher);
	const handleUpdate = (key, value) => {
		if (key === 'approve') {
			approveStudio(value);
		}
	};
	const approveStudio = (studio) => {
		const foundStudio = data.find((s) => s.id === studio.id);
		if (foundStudio.approveStatus === 0) {
			foundStudio.approveStatus = 1;
		} else {
			foundStudio.approveStatus = 0;
		}
		loading = true;
		fetcherPutWithToken(`${baseUrl}/${foundStudio.id}`, foundStudio)
			.then(async (response) => {
				console.log(response);
				data = await fetcher(baseUrl);
			})
			.finally(() => {
				loading = false;
			});
	};
	let renderedData;
	let loading = true;

	if (error)
		return (
			<div className="flex items-center justify-center h-full">
				Failed to load table data
			</div>
		);

	if (data) {
		let className, text, newStudio;
		renderedData = [];
		data.forEach((studio) => {
			newStudio = JSON.parse(JSON.stringify(studio));
			if (studio.activeStatus === 1) {
				className = 'text-green-500 font-bold';
				text = 'OPEN';
			} else {
				className = 'text-red-500 font-bold';
				text = 'CLOSED';
			}
			newStudio.activeStatus = {
				value: text,
				className: className,
				tableCellType: TableCellType.TEXT
			};
			if (studio.approveStatus === 1) {
				className = 'bg-blue-400';
				text = 'Approved';
			} else {
				className = 'bg-red-500';
				text = 'Unapproved';
			}
			newStudio.approveStatus = {
				value: text,
				className: `${className} text-white`,
				tableCellType: TableCellType.BUTTON
			};
			renderedData.push(newStudio);
			console.log(renderedData);
		});
		loading = false;
	}

	if (!data && loading)
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);

	return (
		<div>
			<Title>Studio</Title>
			<Table
				data={renderedData}
				columns={columns}
				pageCount={2}
				update={handleUpdate}
			/>
		</div>
	);
}

export default AdminStudioPage;
