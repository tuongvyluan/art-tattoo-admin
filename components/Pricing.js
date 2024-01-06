import { WidgetPricing } from 'ui';
import PropTypes from 'propTypes';

const PricingComponent = ({ packageTypes = [] }) => {
	const getPackageTypes = () => {
		return packageTypes.map((p) => {
			return {
				title: p.name,
				subtitle: p.description,
				price: p.price,
				id: p.id,
				status: p.status
			};
		});
	};

	return (
		<div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
			{getPackageTypes().map((item, index) => (
				<WidgetPricing
					className="relative break-words rounded-lg overflow-hidden shadow-sm mb-4 bg-white w-full px-2 text-center py-5"
					title={item.title}
					subtitle={item.subtitle}
					price={item.price}
					id={item.id}
					key={item.id}
				/>
				// <div
				// 	className="relative break-words rounded-lg overflow-hidden shadow-sm mb-4 bg-white w-full px-2 text-center py-5"
				// >

				// </div>
			))}
		</div>
	);
};

PricingComponent.propTypes = {
	packageTypes: PropTypes.array
};

export default PricingComponent;
