import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import * as commitAPI from '../api/CommitAPI';
import { resetPageNumber } from '../actions/CommitActions';

const RepoLinksContainer = ({ repositories, dispatch }) => {
  useEffect(() => {
    commitAPI.getRepositories();
  }, []);

  const resetPage = () => {
    dispatch(resetPageNumber());
  };

  return (
    <div>
      <div style={{
        color: 'white', height: '40px', marginLeft: '20px', padding: '10px 0', fontSize: '18px',
      }}
      >
        Repositories
      </div>
      {repositories && repositories.map((repository) => (
        <li key={repository.id}>
          <Link onClick={resetPage} to={`/home/${repository.name}`}>{repository.name}</Link>
        </li>
      ))}
    </div>
  );
};

RepoLinksContainer.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  dispatch: PropTypes.func,
};

RepoLinksContainer.defaultProps = {
  dispatch: PropTypes.func,
  repositories: [],
};

const mapStateToProps = (store) => ({
  repositories: store.commitState.repositories,
});

export default connect(mapStateToProps)(withRouter(RepoLinksContainer));
