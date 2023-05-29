import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';
import Navigator from '../components/Navigator';

import {
  previousPage,
  nextPage,
  resetPageNumber,
} from '../actions/CommitActions';

const CommitListContainer = ({
  commits, page, repositories, match, next, previous,
  dispatch,
}) => {
  const { repo } = match.params;
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const getCommits = (author) => {
    if (!repo && !author) {
      commitAPI.getCommits({ page });
    }
    if (repo && !author) {
      commitAPI.getCommits({ repository: repo, page });
    }
    commitAPI.getCommits({
      repository: repo,
      page,
      author,
    });
  };

  const getAuthorCommits = (author) => {
    setSelectedAuthor(author);
    dispatch(resetPageNumber());
    getCommits(author);
  };

  useEffect(() => {
    getCommits(selectedAuthor);
  }, [page, selectedAuthor]);

  useEffect(() => {
    setSelectedAuthor('');
    getCommits();
  }, [repo]);

  const getAllCommits = (repoName) => {
    setSelectedAuthor('');
    commitAPI.getCommits({ repository: repoName });
  };

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handlePreviousPage = () => {
    dispatch(previousPage());
  };

  const renderAuthors = () => {
    if (repositories && repositories.length > 0) {
      return repositories.flatMap((repository) => {
        if (repo === undefined
          || commits.some((commit) => commit.repository
          && commit.repository.id === repository.id)) {
          return repository.authors.map((author) => (
            <button
              type="button"
              key={author}
              style={{
                margin: 0,
                marginRight: '20px',
                padding: '5px 15px',
                borderRadius: 50,
                border: '1px solid gray',
                cursor: 'pointer',
                backgroundColor: 'white',
                color: '#0275d8',
                borderColor: '#0275d8',
              }}
              onClick={() => getAuthorCommits(author)}
            >
              {author}
            </button>
          ));
        }
        return null;
      });
    }
    return null;
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          marginRight: '10px',
        }}
        >
          Authors:
        </div>
        <ul
          style={{
            listStyleType: 'none',
            display: 'flex',
            margin: '10px 0',
            padding: 0,
          }}
        >
          <button
            disabled={commits.length === 0}
            type="button"
            style={{
              margin: 0,
              marginRight: '20px',
              padding: '5px 15px',
              borderRadius: 50,
              border: '1px solid gray',
              cursor: 'pointer',
              backgroundColor: 'white',
              color: '#0275d8',
              borderColor: '#0275d8',
            }}
            onClick={() => getAllCommits(repo)}
          >
            All
          </button>
          {renderAuthors()}
        </ul>
      </div>
      <CommitList commits={commits} />
      <div className="d-flex justify-content-center">
        <Navigator
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          nextDisabled={!next}
          previousDisabled={!previous}
          pageNumber={page}
        />
      </div>
    </div>
  );
};

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      message: PropTypes.string,
      date: PropTypes.string,
      avatar: PropTypes.string,
      author: PropTypes.string,
      repository: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
  ),
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      authors: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.string,
    }),
  }),
  page: PropTypes.number,
  next: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  previous: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  dispatch: PropTypes.func,
};

CommitListContainer.defaultProps = {
  commits: [],
  page: 1,
  repositories: [],
  match: {},
  next: false,
  previous: false,
  dispatch: () => {},
};

const mapStateToProps = (store) => ({
  commits: store.commitState.commits,
  page: store.commitState.page,
  count: store.commitState.count,
  next: store.commitState.next,
  previous: store.commitState.previous,
  authors: store.commitState.authors,
  repositories: store.commitState.repositories,
  loading: store.commitState.loading,
});

export default connect(mapStateToProps)(withRouter(CommitListContainer));
