import React, {PropTypes} from 'react';
import testable from 'frontend/utils/testable';

@testable()
export default class SignInForm extends React.Component {
  static propTypes = {
    markTestElement: PropTypes.func.isRequired,
    gettext: PropTypes.func.isRequired,
    fields: PropTypes.shape({
      email: PropTypes.object.isRequired,
      password: PropTypes.object.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  render() {
    const {
      markTestElement,
      gettext,

      fields: {
        email,
        password,
      },

      handleSubmit,
      submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="SignInForm-Email">{gettext('Email')}</label>
          <input
            {...markTestElement('Email')}
            type="email"
            id="SignInForm-Email"
            placeholder={gettext('Email')}
            {...email}
            disabled={submitting}
          />
          {email.error && email.touched && <span>{email.error}</span>}
        </div>
        <div>
          <label htmlFor="SignInForm-Password">{gettext('Password')}</label>
          <input
            {...markTestElement('Password')}
            type="password"
            id="SignInForm-Password"
            placeholder={gettext('Password')}
            {...password}
            disabled={submitting}
          />
          {password.error && password.touched && <span>{password.error}</span>}
        </div>
        <button disabled={submitting}>{gettext('Submit')}</button>
      </form>
    );
  }
}
