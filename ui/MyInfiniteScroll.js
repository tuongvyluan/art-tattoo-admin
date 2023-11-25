import { fetcher } from 'lib';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const MyInfiniteScroll = ({url, pageSize = 20, children, loader, parentItems, setParentItems, endMessage, parentPage, setParentPage}) => {
	const [items, setItems] = useState(parentItems);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(parentPage);
	const [myUrl, setMyUrl] = useState(undefined);

	if (!myUrl) {
		if (url.includes('?')) {
			setMyUrl(url.concat('&'));
		} else {
			setMyUrl(url.concat('?'));
		}
	}

	const fetchData = async () => {
		await fetcher(`${myUrl}page=${page}&pageSize=${pageSize}`)
			.then((data) => {
				setItems([...items, ...data]);
        setParentItems([...items, ...data])
				if (data.length < pageSize) {
					setHasMore(false);
				}
			})
			.catch((e) => {
				setHasMore(false);
			});

		setPage(page + 1);
    setParentPage(page + 1)
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<InfiniteScroll
			dataLength={items.length}
      endMessage={endMessage}
			next={fetchData}
			hasMore={hasMore}
			loader={loader}
		>
			{children}
		</InfiniteScroll>
	);
};

MyInfiniteScroll.propTypes = {
	url: PropTypes.string.isRequired,
	children: PropTypes.node,
	loader: PropTypes.node,
	pageSize: PropTypes.number,
  parentItems: PropTypes.array.isRequired,
  setParentItems: PropTypes.func.isRequired,
  endMessage: PropTypes.node
};

export default MyInfiniteScroll;
