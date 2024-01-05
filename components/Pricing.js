import { Card, CardBody, WidgetPricing } from 'ui';
import { ColorSwatch, CursorClick, Link, Moon } from 'icons/solid';

const data = [
	{
		icon: <ColorSwatch width={32} height={32} />,
		title: 'Standard Licence',
		subtitle: 'Test account',
		price: 0,
		features: [
			{
				title: 'Secure'
			},
			{
				title: '1 user'
			},
			{
				title: 'Analytics'
			}
		]
	},
	{
		icon: <Moon width={32} height={32} />,
		title: 'Basic License',
		subtitle: 'Freelancer',
		price: 10,
		features: [
			{
				title: 'Secure'
			},
			{
				title: '2 users'
			},
			{
				title: 'Analytics'
			}
		]
	},
	{
		icon: <CursorClick width={32} height={32} />,
		title: 'Managed License',
		subtitle: 'Small business',
		price: 49,
		features: [
			{
				title: 'Secure'
			},
			{
				title: '3 users'
			},
			{
				title: 'Analytics'
			}
		]
	},
	{
		icon: <Link width={32} height={32} />,
		title: 'Extended License',
		subtitle: 'Corporate',
		price: 99,
		features: [
			{
				title: 'Secure'
			},
			{
				title: '∞ users'
			},
			{
				title: 'Analytics'
			}
		]
	}
];

const PricingComponent = () => {
	return (
		<div className="flex flex-wrap flex-row items-stretch ">
			{data.map((item, index) => (
				<div
					className="w-1/2 lg:w-1/4 px-2 text-center py-5"
					key={index}
				>
					<Card
						key={index}
						className={`${index === 1 ? 'border border-indigo-500' : ''}`}
					>
						<CardBody>
							<WidgetPricing
								title={item.title}
								subtitle={item.subtitle}
								price={item.price}
								features={item.features}
								icon={item.icon}
							/>
						</CardBody>
					</Card>
				</div>
			))}
		</div>
	);
};

export default PricingComponent;
