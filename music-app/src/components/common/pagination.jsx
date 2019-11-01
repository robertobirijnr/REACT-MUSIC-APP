import React from "react";
import _ from "lodash";
import propType from "prop-types";

const Pagination = props => {
	const { itemsCount, pageSize, onPageChange, currentPage } = props;

	const pagesCount = Math.ceil(itemsCount / pageSize);
	if (pagesCount === 1) return null;
	const pages = _.range(1, pagesCount + 1);

	return (
		<nav>
			<ul className="pagination">
				{pages.map(page => (
					<li
						key={page}
						className={page === currentPage ? "page-item active" : "page-item"}
					>
						<a
							href="/#"
							className="page-link"
							onClick={() => onPageChange(page)}
						>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

Pagination.propType = {
	itemsCount: propType.number.isRequired,
	pageSize: propType.number.isRequired,
	onPageChange: propType.func.isRequired,
	currentPage: propType.number.isRequired
};

export default Pagination;
