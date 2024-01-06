import { useEffect, useState } from 'react';
import AdminStudioPage from './Studio';
import useSWR from 'swr';
import { BASE_URL } from 'lib/env';
import { fetcher, formatMonthYear } from 'lib';
import { sharedOptions, gridOptions, colors, options } from 'lib/chartHelper';
import { WidgetStatCard } from 'ui';
import { Users } from 'icons/outline';
import ChartComponent from 'components/ChartComponent';

const AdminIndexPage = () => {
	const { data, error } = useSWR(`${BASE_URL}/studios`);
	const [bookingStat, setBookingStat] = useState([]);
	const [tattooStat, setTattooStat] = useState([]);
	const [labels, setLabels] = useState([]);

	useEffect(() => {
		fetcher(`${BASE_URL}/dashboard/booking`).then((response) => {
			setLabels(response.sta.map((s) => formatMonthYear(s.month)));
			setBookingStat([
				{
					type: 'bar',
					label: 'Tổng số đơn hàng',
					data: response.sta.map((s) => s.noOfBooking),
					...colors[0]
				}
			]);
		});
		fetcher(`${BASE_URL}/dashboard/tattoo`).then((response) => {
			setTattooStat([
				{
					type: 'bar',
					label: 'Tổng số hình xăm',
					data: response.sta.map((s) => s.noOfTattoo),
					...colors[0]
				}
			]);
		});
	}, []);

	if (error) {
		return (
			<div className="flex items-center justify-center h-full">
				Failed to load media data
			</div>
		);
	}
	return (
		<div>
			{/* <div className="flex flex-wrap -mx-2 mb-4">
				<div className="w-full md:w-2/4 lg:w-1/4 px-2">
					<WidgetStatCard
						title="Số lượng tiệm xăm"
						value={`${data?.total}`}
						icon={<Users width={16} height={16} />}
						type={'blue'}
					/>
				</div>
				<div className="w-full md:w-2/4 lg:w-1/4 px-2">
					<WidgetStatCard
						title="Số lượng nghệ sĩ xăm"
						value={'23'}
						icon={<Users width={16} height={16} />}
						type={'gray'}
					/>
				</div>
				<div className="w-full md:w-2/4 lg:w-1/4 px-2">
					<WidgetStatCard
						title={'Số lượng khách hàng'}
						value={'23,465,563'}
						icon={<Users width={16} height={16} />}
						type={'indigo'}
					/>
				</div>
				<div className="w-full md:w-2/4 lg:w-1/4 px-2">
					<WidgetStatCard
						title={'Số lượng package đăng ký'}
						value={'123'}
						icon={<Users width={16} height={16} />}
						type={'red'}
					/>
				</div>
			</div> */}
			{
				// Charts
			}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
				<div>
					<ChartComponent
						type={'bar'}
						title="Số đơn hàng từng tháng trong 12 tháng vừa qua"
						options={{
							...sharedOptions,
							...gridOptions
						}}
						data={{ labels: labels, datasets: bookingStat }}
					/>
				</div>
				<div>
					<ChartComponent
						type={'bar'}
						title="Số hình xăm từng tháng trong 12 tháng vừa qua"
						options={{
							...sharedOptions,
							...gridOptions
						}}
						data={{ labels: labels, datasets: tattooStat }}
					/>
				</div>
			</div>
			<div>
				<AdminStudioPage
					items={data?.studios}
					totalItem={data?.total}
					pageSize={10}
				/>
			</div>
		</div>
	);
};

export default AdminIndexPage;
