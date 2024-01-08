import PropTypes from 'prop-types';
import Button from 'components/Button';
import { PACKAGE_TYPE_STATUS } from 'lib/status';
import Heading from 'components/Heading';
import classNames from 'classnames';
import { fetcherPut, formatPrice } from 'lib';
import { BASE_URL } from 'lib/env';
import Router from 'next/router';

export const WidgetPricing = ({
	title,
	subtitle,
	price,
	status,
	className,
	id,
	duration,
	maxQuantity,
	studioId = ''
}) => {
	const getPackageId = () => {
		const packageId = {
			id: id,
			time: new Date().getTime(),
			studioId: studioId
		};
		return JSON.stringify(packageId);
	};

	const handleStartTrial = () => {
		if (price === 0) {
			fetcherPut(`${BASE_URL}/Package/PurchasePackage`, {
				packageId: id,
				studioId: studioId
			})
				.then(() => {
					Router.replace('/package?code=00');
				})
				.catch(() => {
					Router.replace('/package?code=99');
				});
		}
	};

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
				<div className="text-base pb-1">
					Hạn sử dụng: <span className="font-semibold">{duration} tháng</span>
				</div>
				{maxQuantity && (
					<div className="text-base pb-1">
						Lượt mua tối đa: <span className="font-semibold">{maxQuantity} lần/tiệm xăm</span>
					</div>
				)}

				<p className="mb-5 text-base">{subtitle}</p>
			</div>

			<div className="mt-auto">
				<p className="font-bold text-4xl mb-4">
					<span>{price === 0 ? 'Miễn phí' : formatPrice(price)}</span>
				</p>

				<div className="flex justify-center">
					<form action="/api/vnpay/create_payment_url" method="POST">
						<input name="packageId" readOnly hidden value={`${getPackageId()}`} />
						<input name="amount" readOnly hidden value={price} />
						<input name="bankCode" readOnly hidden value={''} />
						<input name="language" readOnly hidden value={'vn'} />

						<Button
							reset={status === PACKAGE_TYPE_STATUS.UNAVAILABLE || price === 0}
							outline={status === PACKAGE_TYPE_STATUS.UNAVAILABLE}
							onClick={handleStartTrial}
						>
							Mua gói
						</Button>
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
	status: PropTypes.status,
	className: PropTypes.string,
	id: PropTypes.number,
	studioId: PropTypes.string,
	duration: PropTypes.number,
	maxQuantity: PropTypes.number
};
