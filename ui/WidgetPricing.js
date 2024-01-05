import PropTypes from 'prop-types';
import Button from 'components/Button';
import { fetcherPost } from 'lib';
import { v4 } from 'uuid';

export const WidgetPricing = ({ title, subtitle, price, features, icon }) => {
  const handleClickBuy = () => {
    fetcherPost('/api/vnpay/create_payment_url', {
			packageId: '123',
      amount: 100000,
			bankCode: ''
    }).then((data) => {
      console.log(data)
    })
  }

	return (
		<div>
			<div className="flex items-center justify-center mb-5 text-blue-500 py-4">
				{icon}
			</div>

			<div className="mb-5">
				<h5 className="mb-0">{title}</h5>
				<small className="mb-0 text-gray-500">{subtitle}</small>
			</div>

			<ul className="list-none mb-5">
				{features.map((feature, index) => (
					<li key={index}>{feature.title}</li>
				))}
			</ul>

			<p className="mb-5 text-sm">
				Perfect for small startups that have less than 10 team members
			</p>

			<div className="mt-auto">
				<p className="font-bold text-5xl mb-4">
					<span className="symbol">$</span>
					<span>{price}</span>
				</p>

				<div className="flex justify-center">
					<form action='/api/vnpay/create_payment_url' method='POST'>
						<input name='packageId' readOnly hidden value={`${v4()}`} />
						<input name='amount' readOnly hidden value={10000} />
						<input name='bankCode' readOnly hidden value={''} />
						<input name='language' readOnly hidden value={'vn'} />

						<Button>Mua gói</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

WidgetPricing.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	price: PropTypes.number,
	features: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			available: PropTypes.bool
		})
	)
};
