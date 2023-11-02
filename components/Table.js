import { Badge, Card, Loading, Ripple } from 'ui';
import { usePagination, useTable } from 'react-table';

import React from 'react';
import { fetcher } from 'lib';
import useSWR from 'swr';
import TableCellType from 'lib/tableCellType';
import classNames from 'classnames';

export const Table = ({ columns, data, update }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 }
		},
		usePagination
	);

	return (
		<>
			<div className="inline-flex items-center mb-4">
				Show
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
					className="appearance-none relative inline-block w-full px-3 py-3 border border-transparent shadow-sm placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none mx-3"
				>
					{[1, 10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							{pageSize}
						</option>
					))}
				</select>{' '}
				entries
			</div>
			<Card>
				<table
					className="border-collapse table-auto w-full whitespace-nowrap relative divide-y divide-gray-200"
					{...getTableProps()}
				>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr
								className="ltr:text-left rtl:text-right"
								{...headerGroup.getHeaderGroupProps()}
							>
								{headerGroup.headers.map((column) => (
									<th
										className="border-b border-gray-100 dark:border-gray-700 px-6 py-2 font-medium tracking-wider uppercase text-xs"
										{...column.getHeaderProps()}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										if (
											typeof cell.value !== 'undefined' &&
											typeof cell.value.tableCellType !== 'undefined'
										) {
											if (cell.value.tableCellType === TableCellType.BADGE)
												return (
													<td
														className="border-t border-gray-100 dark:border-gray-700"
														{...cell.getCellProps()}
													>
														<span className="px-6 py-4 flex items-center">
															<Badge color={cell.value.color} className="px-2 py-1">
																{cell.value.value}
															</Badge>
														</span>
													</td>
												);
                        if (cell.value.tableCellType === TableCellType.TEXT)
                          return (
                            <td
                              className="border-t border-gray-100 dark:border-gray-700"
                              {...cell.getCellProps()}
                            >
                              <span className={classNames(cell.value.className, "px-6 py-4 flex items-center")}>
                                  {cell.value.value}
                              </span>
                            </td>
                          );
											if (cell.value.tableCellType === TableCellType.BUTTON) {
												return (
													<td
														className="border-t border-gray-100 dark:border-gray-700"
														{...cell.getCellProps()}
													>
														<span className="px-6 py-4 flex items-center">
															<a
																className={classNames(
																	cell.value.className,
																	'relative cursor-pointer inline-block rounded-lg font-semibold px-2 py-2 text-sm leading-none shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 ltr:mr-1 rtl:ml-1 mt-1'
																)}
                                onClick={() => update('approve', row.original)}
															>
																{cell.value.value}
																<Ripple color="black" />
															</a>
														</span>
													</td>
												);
											}
										}
										return (
											<td
												className="border-t border-gray-100 dark:border-gray-700"
												{...cell.getCellProps()}
											>
												<span className="px-6 py-4 flex items-center">
													{cell.render('Cell')}
												</span>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</Card>
			<div className="flex flex-col md:flex-row items-center">
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span className="flex-1"></span>
				<span className="py-3 md:py-0">
					Go to page:{' '}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						min={1}
						max={pageOptions.length}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
						className="appearance-none relative inline-block px-3 py-3 border border-transparent placeholder-gray-500 text-gray-900 shadow-sm rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none w-12"
					/>
				</span>
				<div className="ml-0 mr-0 sm:ltr:ml-3 sm:rtl:mr-3">
					<button
						className="relative inline-flex justify-center ltr:rounded-l-lg rtl:rounded-r-lg border border-transparent px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none"
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
					>
						First
						<Ripple color="black" />
					</button>
					<button
						className="relative inline-flex justify-center border-t border-b border-transparent px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none"
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						Previous
						<Ripple color="black" />
					</button>
					<button
						className="relative inline-flex justify-center border-t border-b border-transparent px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none"
						onClick={() => nextPage()}
						disabled={!canNextPage}
					>
						Next
						<Ripple color="black" />
					</button>
					<button
						className="relative inline-flex justify-center ltr:rounded-r-lg rtl:rounded-l-lg border border-transparent px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none"
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						Last
						<Ripple color="black" />
					</button>
				</div>
			</div>
		</>
	);
};

function App() {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				columns: [
					{
						Header: 'First Name',
						accessor: 'firstName'
					},
					{
						Header: 'Last Name',
						accessor: 'lastName'
					}
				]
			},
			{
				Header: 'Info',
				columns: [
					{
						Header: 'Age',
						accessor: 'age'
					},
					{
						Header: 'Visits',
						accessor: 'visits'
					},
					{
						Header: 'Status',
						accessor: 'status'
					},
					{
						Header: 'Profile Progress',
						accessor: 'progress'
					}
				]
			}
		],
		[]
	);

	const { data, error } = useSWR(`/api/table?lens=40000`, fetcher);

	if (error)
		return (
			<div className="flex items-center justify-center h-full">
				Failed to load table data
			</div>
		);
	if (!data)
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);

	return <Table columns={columns} data={data} />;
}

export default App;
