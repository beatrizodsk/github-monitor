import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { createRepositoryFailure, createRepositorySuccess } from '../actions/CommitActions';

const renderField = ({
  input, placeholder, className, type, meta: { touched, error, invalid },
}) => (
  <div>
    <input
      {...input}
      placeholder={placeholder}
      className={`${className} ${touched && invalid ? 'is-invalid' : ''}`}
      type={type}
    />
    {touched
        && ((error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )))}
  </div>
);

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

const RepoCreateForm = (props) => {
  const dispatch = useDispatch();

  function removeAlertSuccess() {
    dispatch(createRepositorySuccess({}, false));
  }

  function removeAlertFailure() {
    dispatch(createRepositoryFailure(''));
  }

  const {
    successMessage, failureMessage, handleSubmit, pristine, submitting,
  } = props;

  React.useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(removeAlertSuccess, 5000);
      return () => clearTimeout(timeoutId);
    }
    return () => {};
  }, [successMessage]);

  React.useEffect(() => {
    if (failureMessage && failureMessage.length > 0) {
      const timeoutId = setTimeout(removeAlertFailure, 5000);
      return () => clearTimeout(timeoutId);
    }
    return () => {};
  }, [failureMessage]);

  return (
    <div>
      {successMessage
        && (
          <div className="alert alert-success" role="alert">
            Repository added successfully!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={removeAlertSuccess}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      {/* alterar o && pra o modo feito no index do commitlist */}
      {failureMessage && failureMessage.length > 0 && (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        {failureMessage}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={removeAlertFailure}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-10">
            <Field
              name="name"
              placeholder="Enter the repository name, must match {user}/{repo}"
              className="form-control"
              component={renderField}
              type="text"
            />
          </div>
          <div className="col-2">
            <button disabled={pristine || submitting} className="btn btn-block text-white btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

RepoCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  successMessage: PropTypes.bool.isRequired,
  failureMessage: PropTypes.string,
};

RepoCreateForm.defaultProps = {
  failureMessage: '',
};

const validate = (values) => {
  const { username } = document.getElementById('main').dataset;
  const errors = {};
  if (!values.name || !values.name.startsWith(`${username}/`)) {
    errors.name = `Repository must belong to you (eg: ${username}/repo-name)`;
  }
  return errors;
};

export default reduxForm({
  form: 'repoCreate',
  validate,
})(RepoCreateForm);
