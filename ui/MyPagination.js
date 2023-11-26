import { Pagination } from 'flowbite-react';
import PropTypes from 'prop-types'

const MyPagination = ({setCurrent, totalPage, current = 1}) => {

  const handlePageChange = (page) => {
    setCurrent(page)
  }
  
	return (
		<div className="flex overflow-x-auto sm:justify-center">
			<Pagination
				layout="pagination"
				currentPage={current}
				totalPages={totalPage}
				onPageChange={handlePageChange}
				showIcons
			/>
		</div>
	);
};

MyPagination.propTypes = {
  current: PropTypes.number,
  setCurrent: PropTypes.func,
  totalPage: PropTypes.number.isRequired
}

export default MyPagination;