import { Badge, Link, Ripple } from 'ui';

import { ChevronDown } from 'icons/solid';

const Anchor = ({
	icon,
	name,
	badge,
	path,
	hasItems,
	expanded,
	expand,
	isSelected,
	divider,
	level
}) => {
	const content = (
		<a
			className={`flex items-center gap-1 px-3 py-px h-10 text-gray-100 cursor-pointer hover:text-white focus:text-opacity-100 outline-none transition-all duration-150 ease-in-out truncate ${
				(divider ? `text-xxs uppercase font-bold mt-4 sidebar-divider` : ``,
				isSelected ? `text-white` : `text-gray-200`,
				level < 2 ? '' : 'pl-7 rtl:pr-7')
			}`}
			onClick={expand}
		>
			{icon && <span className="mr-4 rtl:ml-4">{icon}</span>}
			<span className="mr-auto rtl:ml-auto leading-none">{name}</span>
			{badge && <Badge color={badge.type}>{badge.value}</Badge>}
			{hasItems && (
				<span
					className={`transition ease-in duration-150 transform ${
						hasItems && expanded ? 'rotate-180' : 'rotate-0'
					}`}
				>
					<ChevronDown width={16} height={16} />
				</span>
			)}
			<Ripple className={`rounded-lg overflow-hidden`} />
		</a>
	);

	return hasItems || divider ? (
		content
	) : (
		<Link href={path} passHref prefetch={false}>
			{content}
		</Link>
	);
};

export default Anchor;
