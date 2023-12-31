import { Card, CardBody, Chart } from 'ui';

const ChartComponent = ({title, subtitle, type, data, height, options }) => {
	return (
		<Card>
			<div className="flex text-base font-semibold items-center content-between px-4 py-4 border-b border-solid border-gray-100 dark:border-gray-700">
				{title} {subtitle}
			</div>
			<CardBody>
				<Chart
					type={type}
					data={data}
					height={height}
					options={options}
				/>
			</CardBody>
		</Card>
	);
};

export default ChartComponent;
