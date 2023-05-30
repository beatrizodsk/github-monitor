import * as types from './ActionTypes';
// eslint-disable-next-line import/no-cycle
import * as commitAPI from '../api/CommitAPI';

export const createRepositorySuccess = (response, successMessage) => {
  commitAPI.getRepositories();
  return {
    type: types.CREATE_REPOSITORY_SUCCESS,
    payload: { response, successMessage },
  };
};

export const createRepositoryFailure = (failureMessage) => ({
  type: types.CREATE_REPOSITORY_FAILURE,
  payload: { failureMessage },
});

export const getCommitsSuccess = (data) => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: {
    commits: Object.values(data.commits),
    count: data.count,
    next: data.next,
    previous: data.previous,
  },
});

export const getCommitsFailure = (failureMessage) => ({
  type: types.GET_COMMITS_FAILURE,
  payload: { failureMessage },
});

export const getRepositoriesSuccess = (repositories) => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: { repositories },
});

export const getRepositoriesFailure = (failureMessage) => ({
  type: types.GET_REPOSITORIES_FAILURE,
  payload: { failureMessage },
});

export const previousPage = () => ({
  type: types.PREVIOUS_PAGE,
});

export const nextPage = () => ({
  type: types.NEXT_PAGE,
});

export const resetPageNumber = () => ({
  type: types.RESET_PAGE_NUMBER,
});

export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  loading,
});
