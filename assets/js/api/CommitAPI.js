import axios from 'axios';
import { reset } from 'redux-form';
import store from '../store';
// eslint-disable-next-line import/no-cycle
import {
  createRepositoryFailure,
  createRepositorySuccess,
  getCommitsSuccess,
  getRepositoriesSuccess,
  getRepositoriesFailure,
  getCommitsFailure,
} from '../actions/CommitActions';

const REPOSITORIES_URL = '/api/repositories/';
const COMMITS_URL = '/api/commits/';

export const getCommits = (params) => {
  axios.get(COMMITS_URL,
    { params: { ...params } }).then((response) => {
    store.dispatch(getCommitsSuccess({
      commits: response.data.commits,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    }));
  }).catch((error) => {
    const err = error.response;
    store.dispatch(getCommitsFailure(err.data));
  });
};

export const getRepositories = (params) => axios.get(REPOSITORIES_URL,
  { params: { ...params } }).then((response) => {
  store.dispatch(getRepositoriesSuccess(response.data));
}).catch((error) => {
  const err = error.response;
  store.dispatch(getRepositoriesFailure(err.data));
});

export const createRepository = (values, headers, formDispatch) => axios.post(
  REPOSITORIES_URL,
  values,
  { headers },
)
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
  }).catch((error) => {
    const err = error.response;
    store.dispatch(createRepositoryFailure(err.data));
  });
