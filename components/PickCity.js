import { ChevronDown } from 'icons/outline';
import { cityList, cityMap } from 'lib/city';
import PropTypes from 'propTypes';
import { Dropdown, DropdownMenu, DropdownToggle } from 'ui';

const PickCity = ({ city, setCity }) => {
	const cities = cityMap;
	return (
		<Dropdown className={'relative w-full'}>
			<DropdownToggle>
				<div className="appearance-none relative block w-full px-3 py-2.5 border border-gray-600 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none">
					<div>{cities.get(city)}</div>
					<div className="absolute top-2 right-2">
						<ChevronDown width={16} height={16} />
					</div>
				</div>
			</DropdownToggle>
			<DropdownMenu className={'w-full h-32 overflow-auto'}>
				{cityList.map((c) => (
					<div
						key={c.level1_id}
						onClick={() => setCity(c.level1_id)}
						className={`w-full px-2 py-1 cursor-pointer hover:bg-gray-100 ${c.level1_id === city ? 'bg-blue-50' : ''}`}
					>
						{c.name}
					</div>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};

PickCity.propTypes = {
	city: PropTypes.string.isRequired,
	setCity: PropTypes.func.isRequired
};

export default PickCity;
