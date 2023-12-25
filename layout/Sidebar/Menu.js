import { addRandomId, getMatchedObjectByUrl } from './helpers';
import { useEffect, useState } from 'react';

import List from './List';
import { adminRoutes, studioRoutes } from 'lib';
import { useAppState } from 'components/AppProvider';
import Router, { useRouter } from 'next/router';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';

const Menu = () => {
	// Check authenticated
	const { status, data } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') {
			Router.replace('/auth/signin');
		}
	}, [status]);

	const [routes, setRoutes] = useState([]);
	useEffect(() => {
		if (data && data.user && data.user.role) {
			switch (data.user.role) {
				case ROLE.ADMIN:
					setRoutes(adminRoutes);
					break;
				case ROLE.STUDIO:
					setRoutes(studioRoutes);
					break;
			}
		}
	}, [data]);

	const [state] = useAppState();
	const items = addRandomId(routes);
	const { pathname } = useRouter();
	const [currentNode, setCurrentNode] = useState(getMatchedObjectByUrl(items, pathname));

	const selectedListItem = (event) => {
		setCurrentNode(event);
	};

	useEffect(() => {
		const foundNode = getMatchedObjectByUrl(items, pathname);
		if (
			foundNode?.path !== null &&
			foundNode.path !== ''
		) {
			setCurrentNode(foundNode);
			selectedListItem(foundNode);
		}
	}, [pathname]);

	return (
		<ul className="block overflow-y-auto flex-1 pb-3 mt-3">
			{items.map((node, index) => {
				return (
					<List
						key={index}
						node={node}
						level={1}
						selectedNode={currentNode}
						sidebarColor={state.sidebarColor}
						selectedItem={(e) => selectedListItem(e)}
					/>
				);
			})}
		</ul>
	);
};

export default Menu;
