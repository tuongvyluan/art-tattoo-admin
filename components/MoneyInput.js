import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const MoneyInput = ({value, onAccept, currency = '₫'}) => {
	return (
		<div className='relative'>
			<span className="absolute top-2 left-2">{currency}</span>
			<IMaskInput
				className="w-full rounded-lg py-2 pr-2 pl-5 text-base border border-gray-300"
				mask={Number}
				min={0}
				max={1000000000}
				scale={0}
				unmask={'typed'}
				radix="."
				thousandsSeparator=","
				value={`${value}`}
				onAccept={onAccept}
			/>
		</div>
	);
};

MoneyInput.propTypes = {
	value: PropTypes.number.isRequired,
	onAccept: PropTypes.func.isRequired,
	currency: PropTypes.string
}

export default MoneyInput;