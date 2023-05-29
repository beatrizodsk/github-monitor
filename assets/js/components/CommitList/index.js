import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const CommitList = ({ commits }) => (
  <div>
    {!!commits && commits.length > 0 ? (
      <div>
        <div className="card card-outline-secondary my-4" style={{ overflowY: 'scroll', overflowX: 'none', height: '70vh' }}>
          <div className="card-header">
            Commit List
          </div>
          <div className="card-body">
            {commits.map((commit, index) => (
              <div key={commit.sha}>
                <div className="avatar">
                  <img alt={commit.author} className="img-author" src={commit.avatar} />
                </div>
                <div className="commit-details">
                  <p>{commit.message}</p>
                  <small className="text-muted">
                    {' '}
                    {commit.author}
                    authored on
                    {' '}
                    {commit.repository.name}
                    at
                    {' '}
                    {new Date(commit.date).toLocaleString()}
                  </small>
                  {index !== commits.length - 1 && <hr />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <p style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15rem',
      }}
      >
        There are no commits in this repository
      </p>
    )}
  </div>
);

CommitList.propTypes = {
  commits: PropTypes.arrayOf(
    PropTypes.shape({
      sha: PropTypes.string,
      message: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
      avatar: PropTypes.string,
      repository: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default CommitList;
