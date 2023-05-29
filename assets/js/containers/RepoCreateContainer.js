import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import Form from '../components/RepoCreateForm';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = { ...values, name };
    return commitAPI.createRepository(v, { 'X-CSRFToken': token }, dispatch);
  };

  render() {
    const { successMessage, failureMessage } = this.props;
    return (
      <Form
        onSubmit={this.submit}
        successMessage={successMessage}
        failureMessage={failureMessage}
      />
    );
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool,
  failureMessage: PropTypes.string,
};

RepoCreateContainer.defaultProps = {
  successMessage: false,
  failureMessage: '',
};

const mapStateToProps = (store) => ({
  successMessage: store.commitState.successMessage,
  failureMessage: store.commitState.failureMessage,
});

export default connect(mapStateToProps)(RepoCreateContainer);
