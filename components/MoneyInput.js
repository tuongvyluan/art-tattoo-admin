import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const MoneyInput = ({ value, onAccept, currency = '₫', disabled = false }) => {
	return (
		<div className="relative">
			<span className={`absolute left-2 text-sm top-1`}>{currency}</span>
			<IMaskInput
				disabled={disabled}
				className="text-base text-black flex flex-row items-center rounded-lg py-0.5 pr-2 border border-gray-300 pl-5 w-full"
				mask={Number}
				min={0}
				max={1000000000}
				scale={0}
				required
				placeholder="Nhập giá tiền"
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
	currency: PropTypes.string,
	disabled: PropTypes.bool
};

export default MoneyInput;
