import PropTypes from 'prop-types'
import {
	stringColor,
	stringDifficult,
	stringPlacements,
	stringSize
} from 'lib/status';
import { formatPrice } from 'lib';

const CustomerServices = ({ services }) => {
	return (
		<div className="">
			<div className="flex justify-between w-full pb-1">
				<div className="font-semibold text-xl pb-2">Nhu cầu của khách hàng</div>
			</div>
			<div className="block">
				{services.map((service, serviceIndex) => (
					<div key={service.id}>
						<div className="flex justify-between items-center w-full">
							<div key={service.id} className="pb-1 flex flex-wrap text-base">
								<div>{serviceIndex + 1}</div>
								<div className="pr-1">. {stringSize.at(service.size)},</div>

								{service.placement ? (
									<div className="pr-1">
										Vị trí xăm: {stringPlacements.at(service.placement)},
									</div>
								) : (
									<></>
								)}

								<div className="pr-1">{stringColor(service.hasColor)},</div>

								<div className="pr-1">{stringDifficult(service.isDifficult)},</div>

								<div className="pr-1">
									{formatPrice(service.minPrice)} - {formatPrice(service.maxPrice)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

CustomerServices.propTypes = {
  services: PropTypes.array
}

export default CustomerServices