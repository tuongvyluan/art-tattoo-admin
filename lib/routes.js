import { Calendar, Home, Newspaper } from 'icons/solid';
import { MdMenuBook } from "react-icons/md";
import { GiTwirlyFlower } from 'react-icons/gi';
import { RiTeamLine } from "react-icons/ri";

const size = 18;

export const adminRoutes = [
	{
		path: '/',
		name: 'Trang chủ',
		icon: <Home width={size} height={size} />
	},
	{
		path: '/studio',
		name: 'Tiệm xăm',
		icon: <Newspaper width={size} height={size} />
	},
	{
		path: '/package',
		name: 'Gói',
		icon: <Newspaper width={size} height={size} />
	}
];

export const studioRoutes = [
	{
		path: '/',
		name: 'Trang chủ',
		icon: <Home width={size} height={size} />
	},
	{
		path: '/service',
		name: 'Bảng giá',
		icon: <MdMenuBook size={size} />
	},
	{
		path: '/booking',
		name: 'Booking',
		icon: <Calendar width={size} height={size} />
	},
	{
		path: '/tattoo',
		name: 'Hình xăm',
		icon: <GiTwirlyFlower size={size} />
	},
	{
		path: '/artist',
		name: 'Nghệ sĩ xăm',
		icon: <RiTeamLine size={size} />
	}
];
