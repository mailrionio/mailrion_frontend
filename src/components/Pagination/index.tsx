/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "./pagination.scss";
import { DOTS, usePagination } from "./usePagination";
const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`pagination-container ${className ? className : ""} `}>
      <li
        className={`pagination-item
          ${currentPage === 1 ? "disabled" : ""}
        `}
        onClick={onPrevious}
      >
        <BsArrowLeft />
        Prev
      </li>
      <div className="pagination-number">
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              key={pageNumber}
              className={`pagination-item 
               ${pageNumber === currentPage ? "selected" : ""}
        `}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </div>

      <li
        className={`pagination-item {
          ${currentPage === lastPage ? "disabled" : ""}`}
        onClick={onNext}
      >
        Next
        <BsArrowRight />
      </li>
    </ul>
  );
};

export default Pagination;
