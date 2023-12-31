import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const MoneyInput = ({
	value,
	onAccept,
	currency = '₫',
	disabled = false,
	min = 0,
	max = 1000000000,
	py = 0.5
}) => {
	return (
		<div className="relative">
			<span className={`absolute left-2 text-sm top-${1 + py}`}>{currency}</span>
			<IMaskInput
				disabled={disabled}
				className={`text-base text-black flex flex-row items-center rounded-lg py-${py} pr-2 border border-gray-600 pl-5 w-full`}
				mask={Number}
				min={min}
				max={max}
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
	disabled: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
	py: PropTypes.number
};

export default MoneyInput;
