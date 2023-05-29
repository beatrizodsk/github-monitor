import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const Navigator = ({
  handleNextPage,
  handlePreviousPage,
  nextDisabled,
  previousDisabled,
  pageNumber,
}) => (
  <div>
    <ul className="pagination">
      {previousDisabled ? (
        <li className="page-item disabled">
          <span className="page-link" tabIndex="-1" role="button" aria-disabled="true">
            Previous
          </span>
        </li>
      ) : (
        <li onClick={handlePreviousPage} className="page-item" role="button" tabIndex="0">
          <span className="page-link">Previous</span>
        </li>
      )}
      <li className="page-item disabled">
        <span className="page-link" tabIndex="-1" role="button" aria-disabled="true">
          {pageNumber}
        </span>
      </li>
      {nextDisabled ? (
        <li className="page-item disabled">
          <span className="page-link" tabIndex="-1" role="button" aria-disabled="true">
            Next
          </span>
        </li>
      ) : (
        <li onClick={handleNextPage} className="page-item" role="button" tabIndex="0">
          <span className="page-link">Next</span>
        </li>
      )}
    </ul>
  </div>
);

Navigator.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
  previousDisabled: PropTypes.bool.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

export default Navigator;
