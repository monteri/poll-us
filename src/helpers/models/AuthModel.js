import errorObserver from '../observers/ErrorObserver';

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

class AuthModel {
  constructor(form) {
    const formData = new FormData(form);
    this.data = Object.fromEntries(formData.entries());
  }

  signInValidate() {
    errorObserver.errors = {};
    const { email, password } = this.data;
    if (!isValidEmail(email)) {
      errorObserver.errors.email = 'Email is invalid';
    }
    if (password.length <= 5) {
      errorObserver.errors.password = 'Password should be more than 5 characters';
    }
    errorObserver.commitChanges();
    return Object.keys(errorObserver.errors).length > 0;
  }

  signUpValidate() {
    errorObserver.errors = {};
    const { email, username, password } = this.data;
    if (!isValidEmail(email)) {
      errorObserver.errors.email = 'Email is invalid';
    }
    if (password.length <= 5) {
      errorObserver.errors.password = 'Password should be more than 5 characters';
    }
    if (username <= 2) {
      errorObserver.errors.username = 'Username should be more than 2 characters';
    }
    errorObserver.commitChanges();
    return Object.keys(errorObserver.errors).length > 0;
  }
}

export default AuthModel;
