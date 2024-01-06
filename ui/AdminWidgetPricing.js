import PropTypes from 'prop-types';
import Heading from 'components/Heading';
import classNames from 'classnames';
import { formatPrice } from 'lib';

export const AdminWidgetPricing = ({ title, subtitle, price, status, className, id }) => {

	return (
		<div className={classNames(className, 'flex flex-col relative break-words')}>
			{/* <div className="flex items-center justify-center mb-5 text-blue-500 py-4">
				{icon}
			</div> */}

			<div className="flex-1">
				<Heading>{title}</Heading>
				{/* <ul className="list-none mb-5">
					{features.map((feature, index) => (
						<li key={index}>{feature.title}</li>
					))}
				</ul> */}
				<p className="mb-5 text-base">{subtitle}</p>
			</div>

			<div className="mt-auto">
				<p className="font-bold text-4xl mb-4">
					<span>{price === 0 ? 'Miễn phí' : formatPrice(price)}</span>
				</p>
			</div>
		</div>
	);
};

AdminWidgetPricing.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	price: PropTypes.number,
	status: PropTypes.status,
	className: PropTypes.string,
	id: PropTypes.string
};
