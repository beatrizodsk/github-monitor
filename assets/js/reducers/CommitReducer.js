import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  successMessage: false,
  failureMessage: '',
  count: 1,
  page: 1,
  repositories: [],
  loading: false,
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload.commits),
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      };
    case types.GET_COMMITS_FAILURE: {
      return { ...state, failureMessage: action.payload.failureMessage };
    }
    case types.CREATE_REPOSITORY_SUCCESS: {
      return { ...state, successMessage: action.payload.successMessage };
    }
    case types.CREATE_REPOSITORY_FAILURE: {
      return { ...state, failureMessage: action.payload.failureMessage };
    }
    case types.GET_REPOSITORIES_SUCCESS: {
      return { ...state, repositories: action.payload.repositories };
    }
    case types.GET_REPOSITORIES_FAILURE: {
      return { ...state, failureMessage: action.payload.failureMessage };
    }
    case types.NEXT_PAGE: {
      if (state.page === state.count || state.page > state.count) {
        return { ...state, page: state.page };
      }
      return { ...state, page: state.page + 1 };
    }
    case types.PREVIOUS_PAGE: {
      if (state.page === 1) {
        return { ...state, page: state.page };
      }
      return { ...state, page: state.page > 1 ? state.page - 1 : state.page };
    }
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case types.RESET_PAGE_NUMBER:
      return {
        ...state,
        page: 1,
      };
    default:
      return state;
  }
};

export default commitReducer;
