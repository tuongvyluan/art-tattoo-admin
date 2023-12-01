import { createContext, useContext, useReducer } from 'react';

import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import useOnclickOutside from 'react-cool-onclickoutside';

const DropdownContext = createContext({});
const { Provider } = DropdownContext;
const useDropdownState = () => useContext(DropdownContext);

const reducer = (state, action) => {
	if (action.type === 'toggle') {
		const newState = {
			...state,
			open: typeof action.value !== 'undefined' ? action.value : !state.open
		};
		return newState;
	}
	return state;
};

export const Dropdown = ({ children, className, ...props }) => {
	const [state, dispatch] = useReducer(reducer, {
		open: false
	});
	const ref = useOnclickOutside(() => state.open && dispatch({ type: 'toggle' }));

	return (
		<Provider value={[state, dispatch]}>
			<div
				ref={ref}
				{...props}
				className={classNames(`select-none inline-block`, className)}
			>
				{children}
			</div>
		</Provider>
	);
};

Dropdown.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

export const DropdownToggle = ({ children, className, ...props }) => {
	const [state, dispatch] = useDropdownState();
	return (
		<div
			{...props}
			className={classNames(
				`flex items-center justify-between relative rounded cursor-pointer`,
				className
			)}
			onClick={(e) => dispatch({ type: 'toggle' })}
		>
			{children}
		</div>
	);
};

DropdownToggle.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

export const DropdownMenu = ({
	children,
	className,
	style,
	closeOnClick = true,
	isBottom = false,
	...props
}) => {
	const [state, dispatch] = useDropdownState();
	const bottomKey = () => {
		return isBottom ? 'bottom' : 'top'
	}

	return (
		<Transition
			show={state.open}
			enter="transition ease-out duration-150"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-in duration-150"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
			{...props}
			className={classNames(
				`z-50 absolute bg-white right-0 origin-top-right mt-1 w-auto rounded-lg shadow-lg left-auto ring-1 ring-black ring-opacity-5 `,
				className
			)}
			style={{ minWidth: '150px', [bottomKey()]: '100%' , ...style }}
			onClick={() => {
				if (closeOnClick) {
					dispatch({ type: 'toggle' });
				}
			}}
		>
			{children}
		</Transition>
	);
};

DropdownMenu.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	style: PropTypes.object,
	closeOnClick: PropTypes.bool
};
