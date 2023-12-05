import { cityList, cityMap } from 'lib/city';
import PropTypes from 'propTypes';
import { Dropdown, DropdownMenu, DropdownToggle } from 'ui';

const PickCity = ({ city, setCity }) => {
	const cities = cityMap;
	return (
		<div>
			<Dropdown>
				<DropdownToggle>
					<div className="appearance-none relative block w-full px-3 py-2 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none">
						{cities.get(city)}
					</div>
				</DropdownToggle>
				<DropdownMenu>
					{cityList.map((c) => (
						<div
							key={c.level1_id}
							onClick={() => setCity(c.level1_id)}
							className={`px-2 py-1 cursor-pointer hover:bg-gray-100`}
						>
							{c.name}
						</div>
					))}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

PickCity.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired
}

export default PickCity;
